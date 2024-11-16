import chalk from "chalk";
import mongoose from "mongoose";

const connectToDB = async () => {
  console.log(chalk.bgYellow("Connecting to MongoDB..."));

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(chalk.bgGreen("Connected to MongoDB successfully!"));
  } catch (err) {
    console.log(chalk.bgRed("Error connecting to MongoDB:", err.message));
  }
};

export default connectToDB;
