const express = require('express');
const cors = require('cors');

const loggerMiddleware = require('./middleware/loggerMiddleware');

const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const metricsRoutes = require('./routes/metricsRoutes');

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);

app.use(loggerMiddleware);

app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', metricsRoutes);

module.exports = app;