
// Importing dependencies and initializing express app
let express = require('express');
let app = express();
let port = process.env.PORT || 8084;

let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
let methodOverride = require('method-override');

// app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.get('/', function(req, res) {
  res.sendfile('./index.html')
});

app.listen(port)
console.log('Server running on port: ', port);
