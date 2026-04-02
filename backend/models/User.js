const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: '认证记者',
  },
  stats: {
    publishedCount: {
      type: Number,
      default: 0,
    },
    enrolledCourses: {
      type: Number,
      default: 0,
    },
    acceptanceRate: {
      type: Number,
      default: 100,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
