const jwt = require("jsonwebtoken");
const createToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET_TEMP, {
    expiresIn: "60*1000ms", // 1 min
  });
  return token;
};

module.exports = createToken;
