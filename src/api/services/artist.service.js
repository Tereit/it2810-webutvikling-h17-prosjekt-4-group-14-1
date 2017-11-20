var mongoose = require('mongoose');
var Artist   = require('../models/artist.model');

exports.getAllArtists = function(req, res){
  try {
    artists = Artist.find({}, function(err, artists){
      var artistMap = {};
      artists.forEach(function(artist){
        artistMap[artist._id] = artist;
      })
    });
    return res.status(200).json({status: 200, data: artists, message: "Succesfully recieved Artists"});
  } catch (e) {
    return res.status(400).json({status: 400, message: 'An error occured while getting artists...'});
  }
}
