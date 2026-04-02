require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');
const Report = require('./models/Report');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Clear existing collections
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Course.deleteMany();
    await Report.deleteMany();

    // 3. Create a test User
    console.log('Seeding Test User...');
    const testUser = await User.create({
      username: '李记者',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: '认证记者',
      stats: {
        publishedCount: 12,
        enrolledCourses: 5,
        acceptanceRate: 100,
      }
    });
    console.log(`Test user created with ID: ${testUser._id}`);

    // 4. Create dummy Courses
    console.log('Seeding Courses...');
    const courses = await Course.insertMany([
      { title: '新闻伦理与深度调查采访', description: '掌握核心采访技巧与道德准则' },
      { title: '融媒体时代的摄影实务', description: '如何用手机拍出大片感新闻图片' },
      { title: '短视频剪辑与传播力塑造', description: '快速产出百万播放新闻短片的方法论' }
    ]);

    // 5. Create dummy Reports authored by the Test User
    console.log('Seeding Reports...');
    const reports = await Report.insertMany([
      {
        author: testUser._id,
        title: '重磅：某科技公司宣布在新能源电池领域取得突破性进展',
        content: '近日，业内知名的科技公司宣布成功研发出下一代固态电池技术，该技术预计将使目前的电车续航里程翻倍...',
        tag: '独家报道',
        images: ['https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=600&q=80'],
        status: 'published'
      },
      {
        author: testUser._id,
        title: '老城区改造正式启动：倾听来自深巷的声音',
        content: '经过多轮论证与民意征集，备受瞩目的老城区改造项目于今日正式动工。记者深入街巷，采访了多位世居于此的老人...',
        tag: '深度调查',
        images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=600&q=80'],
        status: 'published'
      },
      {
        author: testUser._id,
        title: '直击年度游戏展：虚拟现实设备体验馆人满为患',
        content: '本年度国际游戏展首日便迎来了海量玩家的参观。其中虚拟现实展区更是成为了最炙手可热的焦点...',
        tag: '现场直击',
        images: ['https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80'],
        status: 'published'
      }
    ]);

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
