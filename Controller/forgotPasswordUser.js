import chalk from "chalk";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import sendEmail from "../Util/sendEmail.js";
import bcrypt from "bcrypt";

const forgotPasswordUser = async (req, res) => {
  console.log(chalk.bgBlue("Received request for password reset."));

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No account found with this email." });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_KEY_TEMP, {
      expiresIn: "1h",
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Password Reset Request",
      `Click the link to reset your password: ${resetLink}`
    );

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (err) {
    console.error(chalk.bgRed("Error in forgotPasswordUser:"), err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default forgotPasswordUser;
