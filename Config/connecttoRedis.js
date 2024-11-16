import Redis from "ioredis";
import chalk from "chalk";

const connectToRedis = async () => {
  console.log(chalk.bgYellow("Connecting to Redis Stack..."));
  const redis = new Redis({
    host: "localhost",
    port: 6379,
    password: "mypassword",
  });

  redis.on("connect", () => {
    console.log(chalk.bgGreen("Connected to Redis Stack successfully!"));
  });

  redis.on("error", (err) => {
    console.error(chalk.bgRed("Redis connection failed:", err));
  });
};

export default connectToRedis;
