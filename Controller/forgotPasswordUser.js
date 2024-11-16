import chalk from "chalk";
import User from "../Models/User";

const forgotPasswordUser = async (req, res) => {
  console.log(chalk.bgBlue("Received request to change user password."));

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "There is no account linked with this email." });
    }
    //verify email here.

    //after verification
    const new_password = alert("Enter a new password");
    user.password = password;
  } catch (err) {
    return res.status(500).json({ message: "Interavl erver error" });
  }
};

export default forgotPasswordUser;
