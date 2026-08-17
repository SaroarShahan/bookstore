const express = require('express');

const bookRoutes = require('./routes/bookRoutes');

function createApp() {
  const app = express();

  app.use(express.json());

  // Routes
  app.use('/api/v1/books', bookRoutes);


  app.get('/health', (req, res) => {
    res.json({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    });
  });

  return app;
}

module.exports = { createApp };