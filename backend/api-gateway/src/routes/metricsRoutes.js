const express = require('express');

const {
  getLatestMetrics,
  getMetricsHistory
} = require('../controllers/metricsController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get(
  '/protected/metrics',
  authMiddleware,
  getLatestMetrics
);

router.get(
  '/protected/metrics/history',
  authMiddleware,
  getMetricsHistory
);

module.exports = router;