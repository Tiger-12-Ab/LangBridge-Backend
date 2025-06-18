const translateText = require('../utils/translator');

const translate = async (req, res) => {
  try {
    const { text, sourceLang, targetLang } = req.body;

    if (!text || !sourceLang || !targetLang) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const translated = await translateText(text, sourceLang, targetLang);

    res.status(200).json({ translatedText: translated });

  } catch (error) {
    console.error('Translation Controller Error:', error.message);
    res.status(500).json({ message: 'Failed to translate text.' });
  }
};

module.exports = {
  translate,
};
