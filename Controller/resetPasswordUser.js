import chalk from "chalk";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../Models/User.js";

const resetPasswordUser = async (req, res) => {
  console.log(chalk.bgBlue("Received request to reset user password."));

  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY_TEMP);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(chalk.bgRed("Error in resetPasswordUser:"), err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default resetPasswordUser;
