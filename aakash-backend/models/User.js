const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  avatar: { type: String },
  role: { 
    type: String, 
    enum: ['student','admin','superadmin'],
    default: 'student'
  },
  class: { type: String },
  targetExam: { type: String },
  enrolledCourses: [{
    courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
    enrolledAt: { type: Date },
    progress: { type: Number, default: 0 },
    completedVideos: [{ type: Schema.Types.ObjectId }],
    lastWatched: { type: Schema.Types.ObjectId },
    lastWatchedAt: { type: Date }
  }],
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  lastLoginDate: { type: Date },
  badges: [{ type: String }],
  rank: { type: Number },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  fcmToken: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
