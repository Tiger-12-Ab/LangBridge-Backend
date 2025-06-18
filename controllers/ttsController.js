const textToSpeech = require("../utils/tts");

const handleTTS = async (req, res) => {
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.status(400).json({ error: "Text and language are required" });
  }

  try {
    const result = await textToSpeech(text, lang);

    return res.json({
      audioUrl: result.audio_url || result.url || null,
      base64: result.base64 || null,
    });
  } catch (error) {
    return res.status(500).json({ error: "TTS failed" });
  }
};

module.exports = { handleTTS };
