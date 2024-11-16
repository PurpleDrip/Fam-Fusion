import chalk from "chalk";
import Organ from "../Models/Organ.js";
import bcrypt from "bcrypt";

const registerOrganMiddleware = async (req, res, next) => {
  console.log(
    chalk.bgBlue("Received POST request for organization registration.")
  );

  const { username, email, password, address } = req.body;

  try {
    const existingOrgan = await Organ.findOne({
      $or: [{ organName: username.toLowerCase() }, { organEmail: email }],
    });

    if (existingOrgan) {
      return res
        .status(400)
        .json({ message: "Organization name or email already exists." });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newOrgan = new Organ({
      organName: username.toLowerCase(),
      organEmail: email,
      organAddress: address,
      password: encryptedPass,
    });

    res.locals.user = newOrgan;
    await newOrgan.save();

    console.log(chalk.green("Organization registered successfully."));
    next();
  } catch (err) {
    console.error(chalk.bgRed("Error during organization registration:"), err);
    return res
      .status(500)
      .json({ message: `Internal error occurred: ${err.message}` });
  }
};

export default registerOrganMiddleware;
