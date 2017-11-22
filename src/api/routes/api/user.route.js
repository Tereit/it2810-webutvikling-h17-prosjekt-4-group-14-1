var express = require('express');
var router = express.Router();
var User = require('../../models/user.model');
var mongoose = require('mongoose');

router.get(('/:user'), function(req, res) {
  let user = req.params.user;

  let searchHistory = [];
  User.findOne({name: user}, function(err, results) {
    if (err) {
      console.log(err);
    } else {
      if (results === null) {
        res.send(searchHistory);
      } else {
        res.send(results.searchHistory);
      }
    }
  });
});

router.post(('/:user'), function(req, res) {
  let user = req.params.user;
  let user_result = [];
  console.log(req.body.search);

  User.findOne({name: user}, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else if (!foundUser){
      console.log('No user found...');
      let newUser = new User({
        name: user,
        searchHistory: req.body.search
      });
      newUser.save();
      res.send(newUser);
    } else {
      console.log('Found user');
      foundUser.searchHistory.push(req.body.search);
      foundUser.save((err, foundUser) => {
        if (err) {
          console.log(err);
        } else {
          res.send(foundUser);
        }
      });
    }
  });
});

module.exports = router;
