const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authenticateUser = require('../middleware/authMiddleware');

router.get('/summary', authenticateUser, dashboardController.getDashboardSummary);
router.get('/progress', authenticateUser, dashboardController.getProgressData);
router.get('/activity', authenticateUser, dashboardController.getActivityFeed);

module.exports = router;
