const jwt = require("jsonwebtoken");

const createRefreshToken = (id) => {
  const refresh_token = jwt.sign({ id: id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "180s", // 3min
  });
  return refresh_token;
};

module.exports = createRefreshToken;
