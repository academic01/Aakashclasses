const SiteSettings = require('../models/SiteSettings');

const settingsController = {
  // GET /api/settings/site
  getSiteSettings: async (req, res) => {
    try {
      let settings = await SiteSettings.findOne();
      if (!settings) {
         settings = new SiteSettings({
            siteName: 'Aakash Academics',
            heroHeading: 'The Path to Success',
            heroSubheading: 'Join thousands of students learning offline and online.'
         });
         await settings.save();
      }
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/admin/settings/hero
  updateHeroSettings: async (req, res) => {
    try {
      const { heroHeading, heroSubheading, heroStats } = req.body;
      const settings = await SiteSettings.findOneAndUpdate(
        {},
        { heroHeading, heroSubheading, heroStats, updatedAt: Date.now() },
        { new: true, upsert: true }
      );
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/admin/settings/announcement
  updateAnnouncement: async (req, res) => {
    try {
      const { isVisible, text, backgroundColor, textColor, link } = req.body;
      const settings = await SiteSettings.findOneAndUpdate(
        {},
        { announcementBar: { isVisible, text, backgroundColor, textColor, link }, updatedAt: Date.now() },
        { new: true, upsert: true }
      );
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = settingsController;