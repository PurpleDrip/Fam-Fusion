import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chalk from "chalk";

const loginUserMiddleware = async (req, res, next) => {
  console.log(chalk.bgBlue("Received POST request for user login."));

  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or email." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    res.locals.info = user;
    console.log(chalk.green("User authenticated successfully."));
    next();
  } catch (err) {
    console.error(chalk.bgRed("Error during user login:"), err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

export default loginUserMiddleware;
