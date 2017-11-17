var express = require('express');

var router = express.Router();
var artist = require('./api/artist.route');
var lfm    = require('./api/lfm.route');

router.use('/artist', artist);
router.use('/lfm', lfm);

module.exports = router;
