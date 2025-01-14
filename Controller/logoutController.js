import chalk from "chalk";
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(chalk.bgRed("Received Logout Request"));
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

export default router;
