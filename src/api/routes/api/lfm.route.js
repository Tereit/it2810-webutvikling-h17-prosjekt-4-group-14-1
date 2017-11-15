var express    = require('express');
var router     = express.Router();
var lfmService = require('../../services/lastFM.service');

router.get('/getTop50/:country', lfmService.getTop50);
router.get('/artist/:artist', lfmService.getArtist);
router.get('/song/:song', lfmService.getSongs);

module.exports = router;
