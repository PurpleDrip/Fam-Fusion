import Record from "../Models/Record.js";
import jwt from "jsonwebtoken";
import Child from "../Models/Child.js";
import chalk from "chalk";

const adoptedProfileMiddleware = async (req, res) => {
  console.log(chalk.bgBlue("Got POST request for child adoption."));

  const { childId } = req.body;
  const token = req.cookies.token || req.cookies.refresh_token;

  if (!token) {
    return res
      .status(400)
      .json({ message: "Session expired. Please login again." });
  }

  let decoded;
  try {
    decoded =
      jwt.verify(token, process.env.JWT_KEY_TEMP) ||
      jwt.verify(token, process.env.JWT_KEY_REFRESH);
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }

  if (decoded.role !== "user") {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const child = await Child.findById(childId);
  if (!child) {
    return res
      .status(400)
      .json({ message: "Child not found with the given ID" });
  }

  if (child.isAdopted) {
    return res.status(400).json({ message: "Child has already been adopted." });
  }

  const record = new Record({
    userId: decoded.id,
    childId,
    organId: child.organId,
  });

  await record.save();

  return res.status(201).json({ message: "Adoption recorded successfully" });
};

export default adoptedProfileMiddleware;
