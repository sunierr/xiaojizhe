const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Report = require('../models/Report');
const User = require('../models/User');
const { protect } = require('../middleware/auth');


// Handle single file upload for images
router.post('/upload', protect, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url });
});

// Create a new report (modified to take an array of existing URLs or handle direct files)
router.post('/', protect, upload.array('images', 9), async (req, res) => {
  try {
    const { title, content, tag, images: existingImages } = req.body;
    const author = req.user.id;
    
    // Combine uploaded files and already-uploaded URLs
    const uploadedUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    let allImages = [...uploadedUrls];
    if (existingImages) {
      const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages;
      allImages = [...allImages, ...parsedExisting];
    }

    const report = new Report({
       author,
       title,
       content,
       tag,
       images: allImages,
       status: 'pending' // Default status
    });

    const savedReport = await report.save();

    // Increment user's published count
    await User.findByIdAndUpdate(author, {
       $inc: { 'stats.publishedCount': 1 }
    });

    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all reports with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reports = await Report.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Report.countDocuments();

    res.json({
      data: reports,
      meta: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single report
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('author', 'username avatar');
    if (!report) return res.status(404).json({ message: 'Report not found' });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
