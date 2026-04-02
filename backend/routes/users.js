const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const Report = require('../models/Report');
const Enrollment = require('../models/Enrollment');

// Get user profile with live stats
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Dynamically calculate counts to ensure accuracy
    const [publishedCount, enrolledCourses] = await Promise.all([
      Report.countDocuments({ author: req.params.id }),
      Enrollment.countDocuments({ user: req.params.id })
    ]);

    user.stats = {
      ...user.stats,
      publishedCount,
      enrolledCourses
    };

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
