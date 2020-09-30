const express = require('express');
const router = express.Router();
const userInterest = require('../controllers/userInterest');

router.get('/:userId', userInterest.fetchUserInterestById);
router.post('/', userInterest.creareUserInterest);
router.patch('/', userInterest.updateUserInterest);
router.delete('/:id', userInterest.deleteUserInterst);

module.exports = router;