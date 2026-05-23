const metrics = [];

const addMetric = (metric) => {
  metrics.unshift(metric);

  if (metrics.length > 10) {
    metrics.pop();
  }
};

const getMetrics = () => {
  return metrics;
};

module.exports = {
  addMetric,
  getMetrics
};