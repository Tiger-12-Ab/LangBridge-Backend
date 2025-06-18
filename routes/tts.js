const express = require("express");
const router = express.Router();
const { handleTTS } = require('../controllers/ttsController');

// POST /api/tts
router.post("/", handleTTS )

module.exports = router;
