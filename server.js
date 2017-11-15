var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

const port = process.env.PORT || 8084;

var app = express();
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/testbase', { useMongoClient: true})
.then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : mongodb://localhost/testbase')})
.catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : mongodb://localhost/testbase')});

app.listen(port);
console.log('Server running on port: ', port);