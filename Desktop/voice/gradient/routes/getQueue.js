const express = require('express');
const { check, validationResult } = require('express-validator');

const QueueController = require('../controllers/fetchingQueueData');

const router = express.Router();


router.get('/queuebyid',[
  check('id').isNumeric()
], QueueController.getQueueById);

router.get('/queuebyname',[
  check('name').isAlphanumeric()
], QueueController.getQueueByName);

router.get('/dedicated/queue', QueueController.getDedicatedQueue);
router.get('/splitter/queue', QueueController.getSplitterQueue);
router.get('/dead/queue', QueueController.getDeadQueue);


module.exports = router;
