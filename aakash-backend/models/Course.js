const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: String,
  shortDescription: String,
  thumbnail: String,
  previewVideo: String,
  category: {
    type: String,
    enum: ['school','senior','govt','cuet','jee','neet','other']
  },
  examType: String,
  class: String,
  subject: String,
  faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
  price: { type: Number, required: true },
  originalPrice: Number,
  discountPercent: Number,
  isFree: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['active','coming_soon','draft','archived'],
    default: 'draft'
  },
  isFeatured: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  language: { 
    type: String, 
    default: 'Hindi + English' 
  },
  totalVideos: Number,
  totalDuration: String,
  totalEnrollments: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  syllabus: [{
    chapterTitle: String,
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }]
  }],
  tags: [String],
  validityDays: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('Course', CourseSchema);
