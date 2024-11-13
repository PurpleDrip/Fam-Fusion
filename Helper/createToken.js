const jwt = require("jsonwebtoken");
const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET_TEMP, {
    expiresIn: "60s", // 1 min
  });
  return token;
};

module.exports = createToken;
