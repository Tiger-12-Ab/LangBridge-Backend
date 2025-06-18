const axios = require('axios');

const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await axios.post(
      'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      {
        from: sourceLang || 'auto',   
        to: targetLang,
        text: text,
      },
      {
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,  
        },
      }
    );

    return response.data.trans; 

  } catch (error) {
    console.error('RapidAPI Translation error:', error.response?.data || error.message);
    throw new Error('Failed to translate text using RapidAPI.');
  }
};

module.exports = translateText;
