const User = require("../Models/User");
const Organ = require("../Models/Organ");

const checkforUser = async (res, username, email, role) => {
  try {
    if (role === "user") {
      const usernameExists = await User.findOne({ U_Name: username });
      if (usernameExists) {
        res.status(400).json({ message: "Username already exists" });
        return true;
      }

      const emailExists = await User.findOne({ U_Email: email });
      if (emailExists) {
        res.status(400).json({ message: "Email already registered" });
        return true;
      }

      return false;
    }
    if (role === "organ") {
      const usernameExists = await Organ.findOne({ O_Name: username });
      if (usernameExists) {
        res.status(400).json({ message: "Username already exists" });
        return true;
      }

      const emailExists = await Organ.findOne({ O_Email: email });
      if (emailExists) {
        res.status(400).json({ message: "Email already registered" });
        return true;
      }

      return false;
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching info from database" });
    return true;
  }
};

module.exports = checkforUser;
