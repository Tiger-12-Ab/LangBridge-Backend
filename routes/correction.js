const express = require('express');
const router = express.Router();
const { handleCorrection } = require('../controllers/correctionController');

router.post('/', handleCorrection);

module.exports = router;
