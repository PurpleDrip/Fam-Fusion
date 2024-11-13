const jwt = require("jsonwebtoken");
const createToken = require("./createToken");

const checkforToken = (req, res) => {
  let token = req.cookies.token;

  try {
    if (!token) {
      token = req.cookies.refresh_token;

      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
      if (!decoded) {
        res.status(401).json({ message: "Unauthorized" });
        return false;
      }
      console.log("There was refresh token but no temp token.");
      const newToken = createToken(decoded.id);
      res.cookie("token", newToken, {
        httpOnly: true,
        maxAge: 60 * 1000, // 1 min
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      req.user = decoded;
      return true;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_TEMP);
    if (!decoded) {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }

    req.user = decoded;
    return true;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired, please log in again." });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
    return false;
  }
};

module.exports = checkforToken;
