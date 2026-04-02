const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Report = require('../models/Report');

// Create a new report
router.post('/', upload.array('images', 9), async (req, res) => {
  try {
    const { title, content, tag, author } = req.body;
    
    const imageUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const report = new Report({
      author,
      title,
      content,
      tag,
      images: imageUrls,
      status: 'pending' // Default status
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('author', 'username avatar').sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
