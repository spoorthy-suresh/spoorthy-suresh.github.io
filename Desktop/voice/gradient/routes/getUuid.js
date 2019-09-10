const express = require('express');
const UUIDController = require('../controllers/createUUID');

const router = express.Router();


router.get('/uuid',  UUIDController.createUUID);

module.exports = router;
