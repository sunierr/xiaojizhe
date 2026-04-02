require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Route files
const usersRoutes = require('./routes/users');
const reportsRoutes = require('./routes/reports');
const coursesRoutes = require('./routes/courses');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Set static folder for image uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/users', usersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/courses', coursesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
