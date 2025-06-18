const Quiz = require("../models/Quiz");
const Activity = require("../models/Activity");

// POST - Save quiz attempt
const createQuizAttempt = async (req, res) => {
  try {
    const { question, options, correctAnswer, userAnswer, type } = req.body;

    if (!question || !correctAnswer || !userAnswer || !type) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    if (!["mcq", "fill"].includes(type)) {
      return res.status(400).json({ message: "Invalid quiz type." });
    }

    const isCorrect =
      userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

     const score = isCorrect ? 1 : 0;

    const quizAttempt = new Quiz({
      user: req.user._id,
      question,
      options,
      correctAnswer,
      userAnswer,
      type,
      isCorrect,
      score,
    });

    const savedAttempt = await quizAttempt.save();

    await Activity.create({
      userId: req.user._id,
      type: "quiz",
      message: `Attempted a ${
        type === "mcq" ? "Multiple Choice" : "Fill-in-the-Blank"
      } quiz question.`,
    });

    res.status(201).json(savedAttempt);
  } catch (error) {
    console.error("Error creating quiz attempt:", error);
    res.status(500).json({ message: "Server error creating quiz attempt." });
  }
};

// GET - User's quiz history
const getQuizHistory = async (req, res) => {
  try {
    const history = await Quiz.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Server error fetching quiz history." });
  }
};

module.exports = {
  createQuizAttempt,
  getQuizHistory,
};
