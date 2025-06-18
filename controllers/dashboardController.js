const Flashcard = require("../models/Flashcard");
const Quiz = require("../models/Quiz");
const Activity = require("../models/Activity");

exports.getDashboardSummary = async (req, res) => {
  const userId = req.user.id;
  try {
    const flashcardsCount = await Flashcard.countDocuments({ user: userId });
    const quizzes = await Quiz.find({ user: userId });

    const avgScore =
      quizzes.length > 0
        ? Math.round(
            (quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) *
              100
          )
        : 0;
        
    const lastActivity = quizzes.sort((a, b) => b.createdAt - a.createdAt)[0]
      ?.createdAt;

    res.json({
      flashcardsCount,
      quizzesTaken: quizzes.length,
      avgScore,
      lastActive: lastActivity,
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProgressData = async (req, res) => {
  const userId = req.user.id;
  try {
    const quizzes = await Quiz.find({ user: userId }).sort({ createdAt: 1 });

    const dailyScores = quizzes.reduce((acc, quiz) => {
      const date = new Date(quiz.createdAt).toISOString().split("T")[0];
      if (!acc[date]) acc[date] = { date, score: 0, count: 0 };
      acc[date].score += quiz.score;
      acc[date].count += 1;
      return acc;
    }, {});

    const result = Object.values(dailyScores).map(({ date, score, count }) => ({
      date,
      score: Math.round(score / count),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getActivityFeed = async (req, res) => {
  const userId = req.user.id;
  try {
    const activities = await Activity.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};
