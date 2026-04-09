const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSettingsSchema = new Schema({
  siteName: String,
  tagline: String,
  logo: String,
  favicon: String,
  heroHeading: String,
  heroSubheading: String,
  heroStats: [{
    number: String,
    label: String
  }],
  announcementBar: {
    isVisible: Boolean,
    text: String,
    backgroundColor: String,
    textColor: String,
    link: String
  },
  ticker: {
    isVisible: Boolean,
    items: [String],
    speed: Number,
    backgroundColor: String
  },
  socialLinks: {
    youtube: String,
    instagram: String,
    whatsapp: String,
    telegram: String
  },
  contactInfo: {
    phone: String,
    email: String,
    address: String
  },
  seoSettings: {
    metaTitle: String,
    metaDescription: String,
    keywords: String
  },
  maintenanceMode: Boolean,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SiteSettings', SiteSettingsSchema);
