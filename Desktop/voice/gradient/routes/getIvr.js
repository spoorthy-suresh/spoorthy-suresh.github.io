const express = require('express');
const { check, validationResult } = require('express-validator');

const IVRController = require('../controllers/fetchingIvrData');

const router = express.Router();
//console.log('reached user.js');
router.get('/details',[
  check('id').isNumeric()
], IVRController.getIVRDetails);


module.exports = router;
