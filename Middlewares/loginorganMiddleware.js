const checkforNull = require("../Helper/checkforNull");
const Organ = require("../Models/Organ");
const bcrypt = require("bcrypt");

const loginorganMiddleware = async (req, res, next) => {
  console.log("Got a login api request for Organization.");

  const { username, password } = req.body;
  let user;
  if (checkforNull(res, username, password)) return;
  try {
    user = await Organ.findOne({ O_Name: username });
  } catch (err) {
    res.status(500).json({ message: "Error accessing the db" });
    return;
  }

  if (!user) {
    res
      .status(401)
      .json({ message: "Invalid username or Organization doesnt exist" });
    return;
  }
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, user.O_Password);
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

module.exports = loginorganMiddleware;
