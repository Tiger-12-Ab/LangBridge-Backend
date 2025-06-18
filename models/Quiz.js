const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  userAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    enum: ['mcq', 'fill'],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  
},
{ timestamps: true } 
);

module.exports = mongoose.model('Quiz', quizSchema);
