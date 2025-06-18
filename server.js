const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://lang-bridge-orcin.vercel.app", 
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/flashcards', require('./routes/flashcards'));
app.use('/api/quiz', require('./routes/quiz'));   
app.use('/api/translate', require('./routes/translate'));
app.use('/api/correction', require('./routes/correction'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/activity', require('./routes/activity'));
app.use('/api/tts', require('./routes/tts'));


// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
