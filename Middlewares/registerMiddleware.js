const User = require("../Models/User");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const checkforNull = require("../Helper/checkforNull");
const checkforUser = require("../Helper/checkforUser");
const createToken = require("../Helper/createToken");
const createRefreshToken = require("../Helper/createRefreshToken");
const savetoDB = require("../Helper/savetoDB");

// // Initialize Redis client
// const redis = new Redis({
//   host: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6379,
// });

const registerMiddleware = async (req, res, next) => {
  console.log("Got a register api request.");
  const role = "user";
  const { username, email, password } = req.body;

  if (checkforNull(res, username, email, password)) return;

  if (await checkforUser(res, username, email, role)) return;

  const encryptedPass = await bcrypt.hash(password, 10);

  const user = new User({
    U_Name: username.toLowerCase(),
    U_Email: email,
    U_Password: encryptedPass,
  });
  const token_info = {
    id: user._id,
    role: "user",
  };
  const token = createToken(token_info);
  const refresh_token = createRefreshToken(token_info);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 1000, // 1 min
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.cookie("refresh_token", refresh_token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    httpOnly: true,
    maxAge: 3 * 60 * 1000, // 3 mins
  });
  await savetoDB(res, user);
  console.log("Created user successfully.");
  return res.status(201).json(user);
};

module.exports = registerMiddleware;
