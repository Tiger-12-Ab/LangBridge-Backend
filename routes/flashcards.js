const express = require('express');
const router = express.Router();
const {
  createFlashcard,
  getUserFlashcards,
  updateFlashcard,
  deleteFlashcard,
} = require('../controllers/flashcardController');

const authenticateUser = require('../middleware/authMiddleware');

// All flashcard routes 
router.post('/', authenticateUser, createFlashcard);           
router.get('/', authenticateUser, getUserFlashcards);           
router.put('/:id', authenticateUser, updateFlashcard);          
router.delete('/:id', authenticateUser, deleteFlashcard);       

module.exports = router;
