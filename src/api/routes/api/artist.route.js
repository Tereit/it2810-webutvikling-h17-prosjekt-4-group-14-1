var express = require('express');
var router = express.Router();
var Artist = require('../../models/artist.model');
var mongoose = require('mongoose');

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
    res.send(artistMap);
  });
});

router.post('/', function(req, res){
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
