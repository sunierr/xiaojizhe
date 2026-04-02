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

// Get current user's enrollments
router.get('/my/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.params.userId }).populate('course');
    // Filter out potential nulls if Course record was deleted but enrollment stayed
    const courses = enrollments.map(e => e.course).filter(c => c !== null);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in a course (with 10 course limit)
router.post('/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    // Check total enrolled count
    const count = await Enrollment.countDocuments({ user: userId });
    if (count >= 10) {
      return res.status(400).json({ message: '您最多只能报名10个课程。' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ user: userId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: '已经报名过该课程。' });
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

// Unenroll from a course
router.delete('/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const deleted = await Enrollment.findOneAndDelete({ user: userId, course: courseId });
    
    if (deleted) {
      // update user stats
      await User.findByIdAndUpdate(userId, {
        $inc: { 'stats.enrolledCourses': -1 }
      });
      res.json({ message: '已成功取消报名' });
    } else {
      res.status(404).json({ message: '未找到报名记录' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
