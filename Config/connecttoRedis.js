import Redis from "ioredis";

const connectToRedis = async () => {
  const redis = new Redis({
    host: "localhost", // Redis host
    port: 6379, // Redis port
  });

  try {
    console.log(chalk.green("Connecting to Redis..."));
    await redis.connect();
    console.log("Connected to Redis Stack!");

    // Example to set a key
    await redis.set("name", "John");
    const value = await redis.get("name");
    console.log(value); // Should print 'John'
  } catch (err) {
    console.error("Redis connection failed", err);
  }
};

export default connectToRedis;
