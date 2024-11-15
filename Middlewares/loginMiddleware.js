const checkforNull = require("../Helper/checkforNull");
const User = require("../Models/User");
const bcrypt = require("bcrypt");

const loginMiddleware = async (req, res, next) => {
  console.log("Got a login api request.");

  const { username, password } = req.body;
  let user;
  if (checkforNull(res, username, password)) return;
  try {
    user = await User.findOne({ userName: username.toLowerCase() });
  } catch (err) {
    res.status(500).json({ message: "Error accessing the db" });
    return;
  }

  if (!user) {
    res.status(401).json({ message: "Invalid username or user doesnt exist" });
    return;
  }
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    res.status(500).json({ message: "Error comparing the password " });
    return;
  }

  if (!isPasswordValid) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  return res.status(200).json({ message: "Logged in successfully" });
};

module.exports = loginMiddleware;
