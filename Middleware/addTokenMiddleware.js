import jwt from "jsonwebtoken";
import chalk from "chalk";

const addTokenMiddleware = (req, res, next) => {
  console.log(chalk.bgBlue("Adding access token..."));

  const user = res.locals.info;
  if (req.cookies.token) {
    res.clearCookie("token");
  }

  const newToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_KEY_TEMP,
    { expiresIn: "15m" }
  );

  res.cookie("token", newToken, {
    httpOnly: true,
    maxAge: 900000, // 15 minutes
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  next();
};

export default addTokenMiddleware;
