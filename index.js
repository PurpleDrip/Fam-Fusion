const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./Config/DB");
const loginRoute = require("./Routes/loginRoute");
const registerRoute = require("./Routes/registerRoute");
const profileRoute = require("./Routes/profileRoute");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is the server for Fam Fusion");
});
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/profile", profileRoute);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
