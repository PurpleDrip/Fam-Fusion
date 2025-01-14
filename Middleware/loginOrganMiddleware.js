import Organ from "../Models/Organ.js";
import bcrypt from "bcrypt";
import chalk from "chalk";

const loginOrganMiddleware = async (req, res, next) => {
  console.log(chalk.bgBlue("Received POST request for organization login."));

  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const organ = await Organ.findOne({
      $or: [{ organName: username.toLowerCase() }, { organEmail: email }],
    });

    if (!organ) {
      return res.status(404).json({ message: "Organization not found." });
    }

    const passwordMatch = await bcrypt.compare(password, organ.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    res.locals.info = organ;
    next();
  } catch (err) {
    console.error(chalk.bgRed("Error during login:"), err);
    return res.status(500).json({ message: "Server error during login." });
  }
};

export default loginOrganMiddleware;
