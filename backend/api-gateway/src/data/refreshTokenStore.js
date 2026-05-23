const refreshTokens = new Map();

const saveRefreshToken = (
  refreshToken,
  userData
) => {
  refreshTokens.set(refreshToken, userData);
};

const getRefreshToken = (refreshToken) => {
  return refreshTokens.get(refreshToken);
};

const deleteRefreshToken = (refreshToken) => {
  refreshTokens.delete(refreshToken);
};

module.exports = {
  saveRefreshToken,
  getRefreshToken,
  deleteRefreshToken
};