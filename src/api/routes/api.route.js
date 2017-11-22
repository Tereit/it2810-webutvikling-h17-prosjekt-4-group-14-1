const express = require('express');

const router = express.Router();
const artist = require('./api/artist.route');
const lfm    = require('./api/lfm.route');
const user = require('./api/user.route');

router.use('/artist', artist);
router.use('/lfm', lfm);
router.use('/user', user);

module.exports = router;
