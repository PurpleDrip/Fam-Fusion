const checkforNull = require("../Helper/checkforNull");
const Child = require("../Models/Child");
const mongoose = require("mongoose");
const Organ = require("../Models/Organ");

const addProfileMiddleware = async (req, res) => {
  console.log("Got Profile POST request.");
  const { name, age, sex, organID, healthStatus, bio } = req.body;
  console.log(name, age, sex, organID, healthStatus, bio);

  if (checkforNull(res, name, age, sex, organID, healthStatus, bio)) return;

  try {
    const organization = await Organ.findById(organID);
    if (!organization) {
      return res.status(400).json({ message: "Organization not found" });
    }

    const child = new Child({
      name,
      age,
      sex,
      organId: new mongoose.Types.ObjectId(organID),
      healthStatus,
      bio,
      isAdopted: false,
    });

    const savedChild = await child.save();

    const updatedOrgan = await Organ.findByIdAndUpdate(
      organID,
      { $push: { childrens: savedChild._id } },
      { new: true }
    );

    if (!updatedOrgan) {
      return res.status(500).json({ message: "Failed to update organization" });
    }

    console.log("Child added successfully:", savedChild);
    console.log("Updated Organization:", updatedOrgan);

    return res.status(200).json({ child });
  } catch (err) {
    console.error("Error saving child profile:", err);
    return res
      .status(500)
      .json({ message: "Error saving in DB", error: err.message });
  }
};

module.exports = addProfileMiddleware;
