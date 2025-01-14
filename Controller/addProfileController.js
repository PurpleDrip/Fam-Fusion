import Child from "../Models/Child.js";
import Organ from "../Models/Organ.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";

const addProfileMiddleware = async (req, res) => {
  console.log(
    chalk.bgBlue("Received POST request for adding a child profile.")
  );

  const { name, age, gender, bio, hobbies, race, nationality, description } =
    req.body;

  // Validate required fields
  if (!name || !age || !gender || !bio || !race || !nationality) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled." });
  }

  try {
    const token = req.cookies.token || req.cookies.refresh_token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Session expired. Please login again." });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY_TEMP);
    } catch (err) {
      decoded = jwt.verify(token, process.env.JWT_KEY_REFRESH);
    }

    if (!decoded || decoded.role !== "organ") {
      return res.status(403).json({ message: "Unauthorized operation." });
    }

    // Check if the organization exists
    const organ = await Organ.findById(decoded.id);
    if (!organ) {
      return res.status(404).json({ message: "Organization not found." });
    }

    // Check for existing child profile with the same name and organization ID
    const existingChild = await Child.findOne({
      name: name.toLowerCase(),
      organId: decoded.id,
    });

    if (existingChild) {
      return res.status(400).json({
        message:
          "A profile with the same name already exists for this organization.",
      });
    }

    // Create and save the new child profile
    const newChild = new Child({
      name: name.toLowerCase(),
      age,
      gender,
      bio,
      description,
      hobbies:
        typeof hobbies === "string"
          ? hobbies.split(",").map((hobby) => hobby.trim())
          : [],
      race,
      nationality,
      organId: decoded.id,
    });

    console.log(chalk.green("Saving new child profile:"), newChild);

    await newChild.save();

    // Add the child to the organization's children array
    organ.childrens.push(newChild._id);
    await organ.save();

    console.log(
      chalk.green("Child profile and organization updated successfully.")
    );
    return res.status(201).json({ message: "Profile added successfully." });
  } catch (err) {
    console.error(chalk.bgRed("Error adding child profile:"), err);
    return res.status(500).json({
      message: `Internal error occurred: ${err.message}`,
    });
  }
};

export default addProfileMiddleware;
