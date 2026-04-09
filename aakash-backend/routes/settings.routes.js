const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

router.get('/site', settingsController.getSiteSettings);

module.exports = router;