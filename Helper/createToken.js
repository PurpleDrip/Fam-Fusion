const jwt = require("jsonwebtoken");
const createToken = (info) => {
  const token = jwt.sign(info, process.env.JWT_SECRET_TEMP, {
    expiresIn: "60s", // 1 min
  });
  return token;
};

module.exports = createToken;
