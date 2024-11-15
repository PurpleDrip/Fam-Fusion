const checkforNull = require("../Helper/checkforNull");
const Child = require("../Models/Child");
const mongoose = require("mongoose");
const Organ = require("../Models/Organ"); // Assuming you have this model for organizations

const addProfileMiddleware = async (req, res) => {
  console.log("Got Profile POST request.");
  const { name, age, sex, organID } = req.body;
  console.log(name, age, sex, organID);

  // Check for required fields being null or undefined
  if (checkforNull(res, name, age, sex, organID)) return;

  try {
    // Check if the provided organID exists in the organization collection
    const organization = await Organ.findById(organID);
    if (!organization) {
      return res.status(400).json({ message: "Organization not found" });
    }

    // Create a new child profile
    const child = new Child({
      name,
      age,
      sex,
      organId: new mongoose.Types.ObjectId(organID), // Ensuring valid ObjectId
      healthStatus: "Healthy", // Optional: You can default this value or include in the request body
      bio: "No bio available", // Optional: You can also include a default or provided bio
      isAdopted: false, // Assuming initially not adopted
    });

    // Save to the database
    await child.save(); // `savetoDB` function is not required, you can directly use `save()`

    // Return a success response with the created child
    return res.status(200).json({ child });
  } catch (err) {
    console.error("Error saving child profile:", err);
    return res
      .status(500)
      .json({ message: "Error saving in DB", error: err.message });
  }
};

module.exports = addProfileMiddleware;
