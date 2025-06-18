const express = require('express');
const router = express.Router();
const { serveQuizQuestion } = require('../controllers/quizGeneratorController');
const { createQuizAttempt, getQuizHistory } = require('../controllers/quizController');
const authenticateUser = require('../middleware/authMiddleware');

// Get a quiz question
router.get('/question', authenticateUser, serveQuizQuestion);

// Save a quiz attempt
router.post('/', authenticateUser, createQuizAttempt);

// Get all quiz attempts for the logged-in user
router.get('/history', authenticateUser, getQuizHistory);

module.exports = router;