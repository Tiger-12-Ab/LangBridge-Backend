const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['quiz', 'flashcard', 'correction'],
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Activity', activitySchema);
