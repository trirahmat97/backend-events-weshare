const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag');

router.get('/', tagController.getAllTag);
router.post('/', tagController.createTag);
router.patch('/', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

module.exports = router;