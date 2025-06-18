const Activity = require('../models/Activity');

const getUserActivity = async (req, res) => {
  try {
    const logs = await Activity.find({ userId: req.user._id }).sort({ createdAt: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    console.error('Activity fetch error:', err);
    res.status(500).json({ message: 'Error fetching activity logs' });
  }
};
module.exports = {
  getUserActivity,
};