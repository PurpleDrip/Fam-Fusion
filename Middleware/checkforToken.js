import jwt from "jsonwebtoken";
import chalk from "chalk";

const checkforToken = (req, res) => {
  console.log(chalk.bgBlue("Got API call for checking tokens."));

  let token = req.cookies.token || req.cookies.refresh_token;
  let decoded;

  if (!token) {
    return res
      .status(400)
      .json({ message: "No tokens present" })
      .redirect("/login");
  }

  try {
    // Try verifying the access token first
    decoded = jwt.verify(token, process.env.JWT_KEY_TEMP);

    console.log(chalk.green("Access token is valid."));

    if (decoded.role === "user") {
      return res
        .status(200)
        .json({ message: "Token is present" })
        .redirect("/home/user");
    } else {
      return res
        .status(200)
        .json({ message: "Token is present" })
        .redirect("/home/organ");
    }
  } catch (err) {
    console.log(
      chalk.bgRed("Access token verification failed, checking refresh token...")
    );

    try {
      // Verify the refresh token
      decoded = jwt.verify(token, process.env.JWT_KEY_REFRESH);

      console.log(
        chalk.green("Refresh token is valid. Creating new access token...")
      );

      // Create a new access token
      const newToken = jwt.sign(
        { id: decoded.id, role: decoded.role },
        process.env.JWT_KEY_TEMP,
        { expiresIn: "15m" }
      );

      // Set the new access token in the cookies
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 60 * 1000, // 1 min
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      if (decoded.role === "user") {
        return res
          .status(200)
          .json({ message: "New token issued" })
          .redirect("/home/user");
      } else {
        return res
          .status(200)
          .json({ message: "New token issued" })
          .redirect("/home/organ");
      }
    } catch (err) {
      console.log(chalk.bgRed("Error decoding the refresh token"));
      return res
        .status(401)
        .json({ message: "Invalid refresh token" })
        .redirect("/login");
    }
  }
};

export default checkforToken;
