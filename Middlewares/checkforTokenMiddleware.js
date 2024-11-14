const jwt = require("jsonwebtoken");
const createToken = require("../Helper/createToken");

const checkforTokenMiddleware = (req, res, next) => {
  console.log("Checking for tokens....");
  let token = req.cookies.token;

  try {
    if (!token) {
      token = req.cookies.refresh_token;

      if (!token) {
        console.log("There was neither Refresh Token nor Temp Token.");
        return res.status(400).json({ message: "No Tokens Found" });
      }
      console.log("**Detected a Refresh Token**");
      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
      if (!decoded) {
        console.log("Error decoding the Refresh Token.");
        return res.status(400).json({ message: "Error decoding the Token." });
      }
      console.log("There was no tokens but, there was a refresh token.");
      const newToken = createToken(decoded.id);
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 60 * 1000, // 1 min
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({
        message:
          "There was a Refresh Token using which a Temp Token was restored.",
      });
    }
    console.log("**A Token is detected**");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TEMP);
    if (!decoded) {
      res.status(401).json({ message: "Temp Token couldn't be decoded" });
      return;
    }

    return res.status(200).json({ message: "Found a Temp Token" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired, please log in again." });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
    return;
  }
};

module.exports = checkforTokenMiddleware;
