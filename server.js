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

app.use('/api', api);

app.use("/", express.static(__dirname + '/'));
app.use("/", express.static(__dirname + '/dist'));
// app.use("/", express.static(__dirname + '/api'));

app.get('/', (req, res) => res.sendFile('./dist/index.html'));

app.listen(port);
console.log('Server running on port: ', port);
