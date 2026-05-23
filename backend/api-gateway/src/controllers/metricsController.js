const {
  getMetrics
} = require('../data/metricsStore');

const getLatestMetrics = (req, res) => {
  return res.status(200).json({
    count: getMetrics().length,
    data: getMetrics()
  });
};

const getMetricsHistory = (req, res) => {
  const { range } = req.query;

  const now = Date.now();

  let timeLimit = now;

  switch (range) {
    case '24h':
      timeLimit =
        now - 24 * 60 * 60 * 1000;
      break;

    case '7d':
      timeLimit =
        now - 7 * 24 * 60 * 60 * 1000;
      break;

    case '30d':
      timeLimit =
        now - 30 * 24 * 60 * 60 * 1000;
      break;

    default:
      return res.status(400).json({
        message:
          'Invalid range. Use 24h, 7d or 30d'
      });
  }

  const filteredMetrics =
    getMetrics().filter(
      (metric) =>
        metric.timestamp >= timeLimit
    );

  return res.status(200).json({
    range,
    count: filteredMetrics.length,
    data: filteredMetrics
  });
};

module.exports = {
  getLatestMetrics,
  getMetricsHistory
};