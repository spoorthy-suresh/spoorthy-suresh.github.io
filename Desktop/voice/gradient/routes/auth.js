const express = require('express');
const authController = require('../controllers/status');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.post('/status', isAuth, authController.getStatus);


module.exports = router;
