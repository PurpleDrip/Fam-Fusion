import chalk from "chalk";
import mongoose from "mongoose";

const connectToDB = async () => {
  console.log(chalk.yellow("Connecting to MongoDB..."));

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(chalk.green("Connected to MongoDB successfully!"));
  } catch (err) {
    console.log(chalk.red("Error connecting to MongoDB:", err.message));
  }
};

export default connectToDB;
