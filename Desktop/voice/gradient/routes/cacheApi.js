const express = require('express');
const CachingController = require('../controllers/updatingCacheFromSurface');

const router = express.Router();


router.post('/cacheApi',  CachingController.updateCacheApi);
router.get('/cacheApi',  CachingController.updateCacheApi);

module.exports = router;
