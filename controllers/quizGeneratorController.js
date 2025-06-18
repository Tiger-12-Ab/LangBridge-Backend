const Flashcard = require('../models/Flashcard');
const { generateQuizQuestion } = require('../utils/quizGenerator');

const serveQuizQuestion = async (req, res) => {
  try {
    // Get all flashcards of the user
    const flashcards = await Flashcard.find({ user: req.user._id });

    if (!flashcards || flashcards.length < 1) {
      return res.status(400).json({ message: 'Not enough flashcards to generate a quiz.' });
    }

    // Generate quiz question using helper
    const quizQuestion = generateQuizQuestion(flashcards);

    res.status(200).json(quizQuestion);
  } catch (error) {
    console.error('Error generating quiz question:', error);
    res.status(500).json({ message: 'Server error generating quiz question.' });
  }
};

module.exports = {
  serveQuizQuestion,
};
