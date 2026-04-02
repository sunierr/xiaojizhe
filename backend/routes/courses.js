const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const User = require('../models/User');

// Create course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in a course (needs auth conceptually, but we take userId in body for simplicity now)
router.post('/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    // Check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: 'User already enrolled in this course.' });
    }

    const newEnrollment = new Enrollment({
      user: userId,
      course: courseId
    });
    
    await newEnrollment.save();
    
    // update user stats
    await User.findByIdAndUpdate(userId, {
      $inc: { 'stats.enrolledCourses': 1 }
    });

    res.status(201).json(newEnrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
