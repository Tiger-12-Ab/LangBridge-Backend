const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

const languageMap = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  bn: "Bengali",
  ar: "Arabic",
  he: "Hebrew",
  hi: "Hindi",
  ru: "Russian",
};

const generateQuizQuestion = (flashcards) => {
  if (!flashcards || flashcards.length < 1) {
    throw new Error("Not enough flashcards to generate a quiz session.");
  }

  const selectedCard = getRandomElement(flashcards);
  const { originalText, translatedText, targetLang } = selectedCard;

  const questionType = Math.random() < 0.5 ? 'multiple-choice' : 'fill-in-the-blank';

  
  const languageLabel = languageMap[targetLang] || targetLang;

  if (questionType === 'multiple-choice' && flashcards.length >= 4) {
    const distractors = shuffleArray(
      flashcards
        .filter(card => card._id.toString() !== selectedCard._id.toString())
        .map(card => card.translatedText)
    ).slice(0, 3);

    const options = shuffleArray([translatedText, ...distractors]);

    return {
      type: 'multiple-choice',
      question: `Translate this: "${originalText}" into "${languageLabel}"`,
      options,
      correctAnswer: translatedText
    };
  } else {
    return {
      type: 'fill-in-the-blank',
      question: `Translate this: "${originalText}" into "${languageLabel}"`,
      correctAnswer: translatedText
    };
  }
};

module.exports = { generateQuizQuestion };
