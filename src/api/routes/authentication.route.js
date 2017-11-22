var mongoose = require('mongoose');
var express  = require('express');
var router   = express.Router();
var jwt      = require('jsonwebtoken');
var User     = require('../models/user.model');

router.post('/authenticate', function(req, res) {
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
    if (err) {
      res.json({
        type: false,
        data: "An error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: true,
          data: user,
          token: user.token
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect username/password"
        });
      }
    }
  });
});

router.post('/signup', function(req, res){
  User.findOne({username: req.body.username, password: req.body.password}, function(err, user){
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: false,
          data: "User allready exists"
        });
      } else {
        var userModel = new User();
        userModel.username = req.body.username;
        userModel.password = req.body.password;
        userModel.save(function(err, user){
          user.token = jwt.sign(user, process.env.JWT_SECRET);
          user.save(function(err, user1){
            res.json({
              type:  true,
              data:  user1,
              token: user1.token
            });
          });
        });
      }
    }
  });
});

module.exports = router;
