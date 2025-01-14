import chalk from "chalk";
import Organ from "../Models/Organ.js";
import bcrypt from "bcrypt";

const registerOrganMiddleware = async (req, res, next) => {
  console.log(
    chalk.bgBlue("Received POST request for organization registration.")
  );

  const { name, email, password, address } = req.body;

  try {
    const existingOrgan = await Organ.findOne({
      $or: [{ organName: name.toLowerCase() }, { organEmail: email }],
    });
    if (existingOrgan) {
      return res
        .status(400)
        .json({ message: "Organization name or email already exists." });
    }

    const encryptedPass = await bcrypt.hash(password, 10);
    const newOrgan = new Organ({
      organName: name.toLowerCase(),
      organEmail: email,
      organAddress: address,
      password: encryptedPass,
    });

    await newOrgan.save();

    res.locals.info = newOrgan;
    res.username = newOrgan.name;
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
