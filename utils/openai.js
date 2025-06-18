const axios = require("axios");

const correctSentence = async (text, language = "en", style = "academic") => {
  const options = {
    method: "POST",
    url: "https://grammer-checker1.p.rapidapi.com/v1/grammer-checker",
    params: {
      language,
      style,
      noqueue: "1",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "grammer-checker1.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: { text },
  };

  try {
    const response = await axios.request(options);

   
    const corrected = response.data?.errors?.correction || text;

    return { corrected };
  } catch (error) {
    console.error("Correction API error:", error.response?.data || error.message);
    throw new Error("Failed to get correction from grammar API");
  }
};


module.exports = { correctSentence };
