import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import chalk from "chalk";

const loginUserMiddleware = async (req, res) => {
  console.log(chalk.bgBlue("Got POST request for user login."));

  const { username, email, password } = req.body;

  try {
    const user = await (User.findOne({ username }) || User.findOne({ email }));

    if (!user) {
      return res.status(400).json({ message: "Invalid username or email." });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const oldToken = req.cookies.token;
      const oldRefreshToken = req.cookies.refresh_token;

      if (oldToken) {
        res.clearCookie("token");
      }
      if (oldRefreshToken) {
        res.clearCookie("refresh_token");
      }

      const newToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_KEY_TEMP,
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_KEY_REFRESH,
        { expiresIn: "7d" }
      );

      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 900000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        maxAge: 604800000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res
        .status(200)
        .json({ message: "Logged in Successfully!" })
        .redirect("/home/user");
    } catch (err) {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching from DB" });
  }
};

export default loginUserMiddleware;
