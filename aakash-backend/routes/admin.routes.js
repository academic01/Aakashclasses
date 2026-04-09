const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const settingsController = require('../controllers/settings.controller');
const { protect, admin } = require('../middleware/auth.middleware');

// Optional: apply globally to router
// router.use(protect, admin);

// Admin Site Settings Routes
router.put('/settings/hero', settingsController.updateHeroSettings);
router.put('/settings/announcement', settingsController.updateAnnouncement);

// Admin Course Routes
router.post('/courses/create', courseController.createCourse);
router.get('/courses', courseController.getAllAdmin);

// Storage/Media Routes
const upload = require('../middleware/upload.middleware');
const uploadController = require('../controllers/upload.controller');
router.post('/upload', upload.single('file'), uploadController.uploadMedia);

module.exports = router;