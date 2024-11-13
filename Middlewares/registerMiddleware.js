const User = require("../Models/User");
const bcrypt = require("bcrypt");
const checkforNull = require("../Helper/checkforNull");
const checkforUser = require("../Helper/checkforUser");
const createToken = require("../Helper/createToken");
const createRefreshToken = require("../Helper/createRefreshToken");
const savetoDB = require("../Helper/savetoDB");

const registerMiddleware = async (req, res, next) => {
  console.log("Got a register api request.");
  const { username, email, password } = req.body;

  if (checkforNull(res, username, email, password)) return;

  if (await checkforUser(res, username, email)) return;

  const encryptedPass = await bcrypt.hash(password, 10);

  const user = new User({
    U_Name: username.toLowerCase(),
    U_Email: email,
    U_Password: encryptedPass,
  });

  await savetoDB(res, user);

  const token = createToken();
  const refresh_token = createRefreshToken();

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 1000,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refresh_token", refresh_token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    httpOnly: true,
    maxAge: 60 * 1000,
  });
  console.log("Created user successfully.");
  return res.status(201).json(user);
};

module.exports = registerMiddleware;
