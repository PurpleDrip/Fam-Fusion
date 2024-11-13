const jwt = require("jsonwebtoken");

const createRefreshToken = () => {
  const refresh_token = jwt.sign(
    { name: "John Doe" },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: "6000ms",
    }
  );
  return refresh_token;
};

module.exports = createRefreshToken;
