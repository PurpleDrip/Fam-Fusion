const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to Mongo DB successfully");
    })

    .catch((err) => {
      console.log("Error connecting to Mongo DB\n" + err);
    });
};
module.exports = connectDB;
