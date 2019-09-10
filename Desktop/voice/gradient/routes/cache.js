const express = require('express');
const CacheController = require('../controllers/updatingCache');

const router = express.Router();


router.get('/cache',  CacheController.updateCache);

module.exports = router;
