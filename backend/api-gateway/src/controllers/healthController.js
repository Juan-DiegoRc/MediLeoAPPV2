const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: Date.now()
  });
};

module.exports = {
  healthCheck
};