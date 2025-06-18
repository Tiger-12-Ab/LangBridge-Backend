const Flashcard = require('../models/Flashcard');
const Activity = require('../models/Activity'); 

// Create a new flashcard
const createFlashcard = async (req, res) => {
  try {
    const { originalText, translatedText, sourceLang, targetLang } = req.body;

    if (!originalText || !translatedText || !sourceLang || !targetLang) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCard = new Flashcard({
      user: req.user._id,
      originalText,
      translatedText,
      sourceLang,
      targetLang,
    });

    const savedCard = await newCard.save();
    
    await Activity.create({
      userId: req.user._id,
      type: 'flashcard',
      message: `Created a flashcard from ${sourceLang} to ${targetLang}`,
    });

    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Create flashcard error:', error);
    res.status(500).json({ message: 'Server error creating flashcard' });
  }
};

// Get all flashcards for the user
const getUserFlashcards = async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Get flashcards error:', error);
    res.status(500).json({ message: 'Server error fetching flashcards' });
  }
};

// Update a user's flashcard
const updateFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    if (flashcard.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to edit this flashcard' });
    }

    const { originalText, translatedText, sourceLang, targetLang } = req.body;

    flashcard.originalText = originalText || flashcard.originalText;
    flashcard.translatedText = translatedText || flashcard.translatedText;
    flashcard.sourceLang = sourceLang || flashcard.sourceLang;
    flashcard.targetLang = targetLang || flashcard.targetLang;

    const updatedCard = await flashcard.save();
    res.status(200).json(updatedCard);
  } catch (error) {
    console.error('Update flashcard error:', error);
    res.status(500).json({ message: 'Server error updating flashcard' });
  }
};

// Delete a flashcard
const deleteFlashcard = async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) return res.status(404).json({ message: 'Flashcard not found' });
    if (flashcard.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this flashcard' });
    }

    await flashcard.remove();
    res.status(200).json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Delete flashcard error:', error);
    res.status(500).json({ message: 'Server error deleting flashcard' });
  }
};

module.exports = {
  createFlashcard,
  getUserFlashcards,
  updateFlashcard,
  deleteFlashcard,
};