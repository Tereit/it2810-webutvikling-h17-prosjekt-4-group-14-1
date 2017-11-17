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
  Artist.find({name: name}, function(err, artists){
    var artistMap = {};
    artists.forEach(function(artist){
      artistMap[artist._id] = artist;
    });
    console.log(artistMap);

    if (Object.keys(artistMap).length === 0) {
      console.log('Nothing found in local DB, searching LFM');
      var param = {
        'artist': name,
        'api_key': api_key
      }
      var test = lfm.artist.search(param, function(err, response){
        if (err) {
          console.log(err);
          return null;
        }
        var data = response.artistmatches.artist;
        var results = [];
        for(var i = 0; i < data.length; i++) {
                if(data[i].mbid.length <= 0) continue;
                if(data[i].name.includes('feat.') || data[i].name.includes('Feat.')) continue;
                result = {
                    'name': data[i].name,
                    'mbid': data[i].mbid,
                    'img': data[i].image[1]['#text']
                }
                results.push(result);
                var tempArtist = new Artist({
                  name: result.name,
                  mbid: result.mbid,
                  img: result.img
                });
                // tempArtist.save();
            }
            // console.log(results);
            return results;
        });
        console.log(test);
    } else {
      console.log('ADFADFAFAF');
    }

    res.send(artistMap);
  });
});

// lfm.artist.search(param, function(err, res) {
//     if(err) {
//         console.log(err);
//         return null;
//     }
//     var data = res.artistmatches.artist;
//     var results = [];
//     for(var i = 0; i < data.length; i++) {
//         if(data[i].mbid.length <= 0) continue;
//         if(data[i].name.includes('feat.') || data[i].name.includes('Feat.')) continue;
//         result = {
//             'name': data[i].name,
//             'mbid': data[i].mbid,
//             'img': data[i].image[1]['#text']
//         }
//         results.push(result);
//     }
//     response.send(results);
// });
// }


router.post('/:artist', function(req, res){
  console.log('in API: ', req);
  var newArtist = new Artist({
    name: req.body.name,
    mbid: req.body.mbid,
    img:  req.body.img
  });

  newArtist.save((e, newArtist) => {
    if (e) {
      res.status(500).send(e);
    }
    res.status(200).send(newArtist);
  });
});

router.put('/:id', function(req, res){
  let id = req.params.id;
  Artist.findById(id, (err, artist) => {
    if (err) {
      res.send(500).send(err);
    } else {
      artist.name = req.body.name || artist.name;
      artist.mbid = req.body.mbid || artist.mbid;
      artist.img  = req.body.img || artist.img;

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


module.exports = router;
