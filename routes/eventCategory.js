const express = require('express');
const router = express.Router();
const eventCategory = require('../controllers/eventCategory');

router.get('/', eventCategory.fetchAll);
router.post('/', eventCategory.createCategory);
router.delete('/:id', eventCategory.deleteCategory);
router.patch('/:id', eventCategory.editCategory);

module.exports = router;