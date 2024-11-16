import Child from "../Models/Child.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";

const addProfileMiddleware = async (req, res) => {
  console.log(
    chalk.bgBlue("Received POST request for adding a child profile.")
  );

  const { name, age, gender, bio, hobby, race, nationality } = req.body;

  try {
    const token = req.cookies.token || req.cookies.refresh_token;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Session expired. Please login again." });
    }

    const decoded =
      jwt.verify(token, process.env.JWT_KEY_TEMP) ||
      jwt.verify(token, process.env.JWT_KEY_REFRESH);

    if (decoded.role !== "organ") {
      return res.status(403).json({ message: "Unauthorized operation." });
    }

    const existingChild = await Child.findOne({
      name: name.toLowerCase(),
      organId: decoded.id,
    });

    if (existingChild) {
      return res
        .status(400)
        .json({
          message:
            "A profile with the same name already exists for this organization.",
        });
    }

    const newChild = new Child({
      name: name.toLowerCase(),
      age,
      gender,
      bio,
      hobby,
      race,
      nationality,
      organId: decoded.id,
    });

    await newChild.save();
    return res.status(201).json({ message: "Profile added successfully." });
  } catch (err) {
    console.error(chalk.bgRed("Error adding child profile:"), err);
    return res
      .status(500)
      .json({ message: `Internal error occurred: ${err.message}` });
  }
};

export default addProfileMiddleware;
