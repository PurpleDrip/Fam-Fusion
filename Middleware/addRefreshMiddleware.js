import jwt from "jsonwebtoken";
import chalk from "chalk";

const addRefreshMiddleware = (req, res) => {
  console.log(chalk.bgBlue("Adding refresh token..."));

  const user = res.locals.info;
  if (req.cookies.refresh_token) {
    res.clearCookie("refresh_token");
  }

  const newRefreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY_REFRESH,
    { expiresIn: "7d" }
  );

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    maxAge: 604800000, // 7 days
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "Logged in successfully!" });
};

export default addRefreshMiddleware;
