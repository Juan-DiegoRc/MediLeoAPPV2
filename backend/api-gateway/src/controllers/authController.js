const jwt = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');

const {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken
} = require('../data/refreshTokenStore');

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {
      expiresIn: '15m'
    }
  );
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (
    username !== 'admin' ||
    password !== 'admin123'
  ) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const user = {
    username: 'admin',
    role: 'administrator'
  };

  const accessToken =
    generateAccessToken(user);

  const refreshToken = uuidv4();

  saveRefreshToken(refreshToken, user);

  return res.status(200).json({
    accessToken,
    refreshToken
  });
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({
      message: 'Refresh token required'
    });
  }

  const user =
    getRefreshToken(refreshToken);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid refresh token'
    });
  }

  const accessToken =
    generateAccessToken(user);

  return res.status(200).json({
    accessToken
  });
};

const logout = (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    deleteRefreshToken(refreshToken);
  }

  return res.status(200).json({
    message: 'Logged out successfully'
  });
};

module.exports = {
  login,
  refresh,
  logout
};