const jwt = require("jsonwebtoken");

const createRefreshToken = (info) => {
  const refresh_token = jwt.sign(info, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "180s", // 3min
  });
  return refresh_token;
};

module.exports = createRefreshToken;
