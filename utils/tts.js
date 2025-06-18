// utils/tts.js
const axios = require("axios");

const textToSpeech = async (text, lang = "en") => {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/texttospeech",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-host": "open-ai21.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY
    },
    data: {
      text: text,
      lang: lang, 
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; // This will contain the audio URL or base64
  } catch (error) {
    console.error("TTS API error:", error?.response?.data || error.message);
    throw new Error("Failed to convert text to speech.");
  }
};

module.exports = textToSpeech;
