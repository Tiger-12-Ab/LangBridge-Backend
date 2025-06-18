const { correctSentence } = require('../utils/openai');
const Flashcard = require('../models/Flashcard');
const Activity = require('../models/Activity');

const handleCorrection = async (req, res) => {
  try {
    const { sentence, saveAsFlashcard, sourceLang } = req.body;

    if (!sentence) {
      return res.status(400).json({ message: 'Input sentence is required.' });
    }

    const { corrected } = await correctSentence(sentence);

    let savedFlashcard = null;
    if (saveAsFlashcard && req.user?._id) {
      const flashcard = new Flashcard({
        user: req.user._id,
        originalText: sentence,
        translatedText: corrected,
        sourceLang,
        targetLang: sourceLang, 
      });

      savedFlashcard = await flashcard.save();

      await Activity.create({
        userId: req.user._id,
        type: 'flashcard',
        message: `Created a flashcard from sentence correction`,
      });
    }

    res.status(200).json({
      corrected,
      savedFlashcard,
    });
  } catch (error) {
    console.error("Correction controller failed:", error);
    res.status(500).json({ message: "Error correcting sentence." });
  }
};

module.exports = {
  handleCorrection,
};
