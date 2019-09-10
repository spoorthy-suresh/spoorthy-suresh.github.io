const express = require('express');
const { check, validationResult } = require('express-validator');

const CallController = require('../controllers/fetchingCallLimit');

const router = express.Router();


// router.get('/limit/customer', CallController.getLimitByCustomer;
// router.get('/limit/number', CallController.getLimitByNumber;
// router.get('/limit/channel', CallController.getLimitByChannel;
router.get('/limit', CallController.getLimitById);


module.exports = router;
