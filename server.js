var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bluebird = require('bluebird');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var api = require('./src/api/routes/api.route');

const port = process.env.PORT || 8084;

var app = express();
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/testbase', { useMongoClient: true})
.then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : mongodb://localhost/testbase')})
.catch(()=> { console.log('Error Connecting to the Mongodb Database at URL : mongodb://localhost/testbase')});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Allowing CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', api);

app.use("/", express.static(__dirname + '/'));
app.use("/", express.static(__dirname + '/dist'));

app.use('/*',function(req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

app.listen(port);
console.log('Server running on port: ', port);
