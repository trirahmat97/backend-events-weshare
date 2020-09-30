const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event');

router.get('/', eventController.findAllEvent);
router.get('/user/:userId', eventController.findAllEventById);
router.get('/tags', eventController.findAllEventTags);
router.post('/', eventController.cretaeEvent);
router.patch('/', eventController.updateEvent);

module.exports = router;