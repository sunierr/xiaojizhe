const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/auth');

// Generate JWT form wechat user id
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: '30d',
  });
};

// POST /api/users/wechat-login
router.post('/wechat-login', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    const appId = process.env.WX_APP_ID;
    const appSecret = process.env.WX_APP_SECRET;

    let openid;
    let session_key;

    if (!appId || !appSecret) {
      // Mock mode
      console.log('Mocking WeChat API due to missing env variables');
      openid = `mock_openid_${code}`;
      session_key = 'mock_session_key';
    } else {
      const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
      const response = await axios.get(url);
      
      if (response.data.errcode) {
        return res.status(400).json({ message: 'WeChat API error', error: response.data.errmsg });
      }

      openid = response.data.openid;
      session_key = response.data.session_key;
    }

    // Find or create user
    let user = await User.findOne({ openid });
    if (!user) {
      user = await User.create({
        openid,
        username: `用户_${Math.floor(Math.random() * 10000)}`,
      });
    }

    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const Report = require('../models/Report');
const Enrollment = require('../models/Enrollment');

// Get current user profile with live stats
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Dynamically calculate counts to ensure accuracy
    const [publishedCount, enrolledCourses] = await Promise.all([
      Report.countDocuments({ author: req.user.id }),
      Enrollment.countDocuments({ user: req.user.id })
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
