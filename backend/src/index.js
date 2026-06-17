const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const logger = require('./utils/logger');
const path = require('path');
const fs = require('fs');

// Routes
const authRoutes = require('./routes/authRoutes');
const satelliteRoutes = require('./routes/satelliteRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const locationRoutes = require('./routes/locationRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/satellite', satelliteRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Error:', error);
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
  });
});

// Database sync and server start
const startServer = async () => {
  try {
    // Sync database
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized successfully');

    // Start server
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
