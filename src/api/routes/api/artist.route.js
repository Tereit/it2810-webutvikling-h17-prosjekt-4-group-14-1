var express = require('express');
var router = express.Router();
var Artist = require('../../models/artist.model');
var mongoose = require('mongoose');
var LastfmAPI = require('lastfmapi');
var api_key = '034f5f35cd2966737626588df7d6cf2b'
var lfm = new LastfmAPI({
    'api_key': api_key,
    'secret': 'b97fab5e109145a48bbd6566346feaf7'
});

router.get('/', function(req, res){
  Artist.find({}, function(err, artists){
    var artistMap = {};
    artists.forEach(function(artist){
      artistMap[artist._id] = artist;
    });
    res.send(artistMap);
  });
});

router.get('/:artist', function(req, res){
  let name = req.params.artist;
  let mbids = [];
  getFromDB(name).then(function(resultFromDB){
    for (var key in resultFromDB) {
      mbids.push(resultFromDB[key].mbid);
    }
    if (mbids.length > 0) {
      res.send(resultFromDB);
    } else {
      let results = [];
      getArtistFromLFM(name, results, function(data){
        saveArtist(data);
        res.send(data);
      });
    }
  });
});

function getFromDB(query) {
  return new Promise(function(resolve, reject){
    Artist.find({name: { "$regex": query, "$options": "i" }}, function(err, artists){
      if (err) {
        return reject(err);
      }
      var artistMap = {};
      artists.forEach(function(artist){
        artistMap[artist._id] = artist;
      });
      return resolve(artistMap);
  });
})
}

router.post('/:artist', function(req, res){
  console.log('in API: ', req);
  var newArtist = new Artist({
    name:       req.body.name,
    mbid:       req.body.mbid,
    img:        req.body.img,
    info:       req.body.info,
    genres:     req.body.genres,
    popularity: req.body.popularity
  });

  newArtist.save((e, newArtist) => {
    if (e) {
      res.status(500).send(e);
    }
    res.status(200).send(newArtist);
  });
});

router.put('/:id', function(req, res){
  console.log('Reached server for update...');
  let id = req.params.id;
  Artist.findById(id, (err, artist) => {
    if (err) {
      res.send(500).send(err);
    } else {
      artist.name       = req.body.name       || artist.name;
      artist.mbid       = req.body.mbid       || artist.mbid;
      artist.img        = req.body.img        || artist.img;
      artist.info       = req.body.info       || artist.info;
      artist.genres     = req.body.genres     || artist.genres;
      artist.popularity = req.body.popularity || artist.popularity;
      console.log(artist);
      artist.save((err, artist) => {
        if (err) {
          res.status(500).send(err);
        }
        res.status(200).send(artist);
      });
    }
  });
});

router.delete('/:id', function(req, res){
  let id = req.params.id;

  Artist.findByIdAndRemove(id, (err, artist) => {
    let response = {
      message: 'Artist successfully deleted',
      id: artist._id
    };
    res.status(200).send(response);
  });
});

router.get('/info/:mbid', function(req, res){
  let mbid = req.params.mbid;
  let results = [];
  lfm.artist.getInfo({mbid: mbid, api_key: api_key}, function(err, response){
    if (err) {
      console.log(err);
      return null;
    } else {
      results.push(response);
      res.send(results);
    }
  });
});

function getInfo(results){
  return new Promise(function(resolve, reject){
    lfm.artist.getInfo({mbid: results.mbid, api_key: api_key}, function(err, resp){
      if (err) {
        return reject(err);
      } return resolve({
            'name': resp.name,
            'mbid': resp.mbid,
            'img': resp.image[3]['#text'],
            'info': resp.bio.content,
            'popularity': resp.stats.listeners,
            'genres': resp.tags
          });
        });
      });
}

function getAllInfo(results, callback) {
  var reqArray = [];
  var finalResults = [];
  for (var artist in results) {
    reqArray.push(getInfo(results[artist]));
  }
  Promise.all(reqArray).then(function(allData){
    callback(allData);
  });
}

function getArtistFromLFM(artistName, results, callback){
  var param = {
    'artist': artistName,
    'api_key': api_key
  };
  lfm.artist.search(param, function(err, response){
    if (err) {
      console.log(err);
      return null;
    }
    var data = response.artistmatches.artist;
    for (var i = 0; i < data.length; i++) {
      if (data[i].mbid.length <= 0) continue;
      if (data[i].name.includes('feat.') || data[i].name.includes('Feat.')) continue;
      result = {
        'name': data[i].name,
        'mbid': data[i].mbid,
        'img': data[i].img,
        'info': '',
        'popularity': '',
        'genres': '',
      };
      results.push(result);
    }
    getAllInfo(results, function(data) {
       callback(data)
    });
  });
}

function saveArtist(artists){
  console.log("Storing new artists in DB");
  for(let artist in artists) {
    tempArtist = new Artist();
    tempArtist.name = artists[artist].name;
    tempArtist.mbid = artists[artist].mbid;
    tempArtist.img = artists[artist].img;
    tempArtist.info = artists[artist].info;
    tempArtist.popularity = artists[artist].popularity;
    tempArtist.genres = artists[artist].genres;
    tempArtist.save();
  }
}

function MBIDchecker(artist, callback){
  resultList = [];
  for (var artist in artists) {
    Artist.find({mbid: artists[artist].mbid}, function(err, result) {
      result.forEach(item => {
        console.log(item.mbid);
        resultList.push(item.mbid);
      });
    });
  }
}
module.exports = router;
