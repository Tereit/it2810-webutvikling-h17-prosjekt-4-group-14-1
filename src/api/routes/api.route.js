var express = require('express');

var router = express.Router();
var artist = require('./api/artist.route');
var lfm    = require('./api/lfm.route');
// var auth   = require('./authentication.route');

router.use('/artist', artist);
router.use('/lfm', lfm);
// router.use('/auth', auth);

module.exports = router;
