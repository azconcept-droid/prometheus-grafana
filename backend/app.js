const express = require('express');
const app = express();
const winston = require('winston');

// Configure Winston logger to output JSON
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Middleware to log requests
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      message: 'Request completed',
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      type: 'request'
    });
  });

  res.on('error', (err) => {
    logger.error({
      message: 'Request failed',
      method: req.method,
      path: req.path,
      error: err.message,
      stack: err.stack,
      type: 'error'
    });
  });

  next();
});

// Routes
app.get('/success', (req, res) => {
  res.json({ message: 'Success response' });
});

app.get('/error', (req, res) => {
  res.status(500).json({ message: 'Error response' });
});

// Scheduled logging
function scheduleLogging() {
  // Log success every 5 seconds
  setInterval(() => {
    logger.info({
      message: 'Scheduled success log',
      type: 'scheduled',
      interval: '5s'
    });
  }, 5000);

  // Log error every 10 seconds
  setInterval(() => {
    logger.error({
      message: 'Scheduled error log',
      type: 'scheduled',
      interval: '10s'
    });
  }, 10000);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  scheduleLogging();
});
