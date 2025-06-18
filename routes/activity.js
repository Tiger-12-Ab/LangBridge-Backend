const express = require('express');
const router = express.Router();
const { getUserActivity } = require('../controllers/activityController');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/', authenticateUser, getUserActivity);

module.exports = router;
