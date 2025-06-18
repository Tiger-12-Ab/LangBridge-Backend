const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    translatedText: {
      type: String,
      required: true,
    },
    sourceLang: {
      type: String,
      required: true,
    },
    targetLang: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Flashcard', flashcardSchema);
