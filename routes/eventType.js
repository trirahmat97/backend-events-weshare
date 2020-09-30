const express = require('express');
const router = express.Router();
const eventTypeController = require('../controllers/eventType');

router.get('/', eventTypeController.getAll);
router.post('/', eventTypeController.cretaeEventType);
router.patch('/', eventTypeController.updateCreateType);
router.delete('/:id', eventTypeController.deleteEventType);

module.exports = router;