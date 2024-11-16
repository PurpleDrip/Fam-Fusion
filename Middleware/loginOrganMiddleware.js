import Organ from "../Models/Organ.js";
import chalk from "chalk";

const loginOrganMiddleware = async (req, res) => {
  console.log(chalk.bgBlue("Received POST request for organization login."));

  const { username, email, password } = req.body;

  try {
    const organ = await (Organ.findOne({ organName: username }) ||
      Organ.findOne({ organEmail: email }));

    if (!organ) {
      return res.status(400).json({ message: "User not found." });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, organ.password);

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
        { id: organ._id, role: organ.role },
        process.env.JWT_KEY_TEMP,
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { id: organ._id, role: organ.role },
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
        .redirect("/home/organ");
    } catch (err) {
      return res.status(400).json({ message: "Invalid password" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error fetching from DB" });
  }
};

export default loginOrganMiddleware;
