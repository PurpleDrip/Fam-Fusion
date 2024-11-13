const jwt = require("jsonwebtoken");
const createToken = () => {
  const token = jwt.sign({ user: "John Doe" }, process.env.JWT_SECRET_TEMP, {
    expiresIn: "6000ms",
  });
  return token;
};

module.exports = createToken;
