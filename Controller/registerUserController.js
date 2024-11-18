import chalk from "chalk";
import User from "../Models/User.js";
import bcrypt from "bcrypt";

const registerUserMiddleware = async (req, res, next) => {
  console.log(chalk.bgBlue("Received POST request for user registration."));

  const { username, email, password, address, gender } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username.toLowerCase() }, { email }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username.toLowerCase(),
      email,
      address,
      password: encryptedPass,
      gender,
    });

    res.locals.info = newUser;
    await newUser.save();

    console.log(chalk.green("User registered successfully."));
    next();
  } catch (err) {
    console.error(chalk.bgRed("Error during user registration:"), err);
    return res
      .status(500)
      .json({ message: `Internal error occurred: ${err.message}` });
  }
};

export default registerUserMiddleware;
