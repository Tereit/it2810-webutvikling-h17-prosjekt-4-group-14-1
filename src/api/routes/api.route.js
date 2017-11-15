var express = require('express');

var router = express.Router();
var artist = require('./api/artist.route');

router.use('/artist', artist);

module.exports = router;
