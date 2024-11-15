const Child = require("../Models/Child");
const Organ = require("../Models/Organ");

const deleteProfileMiddleware = async (req, res) => {
  console.log("Received GET request for deleting a Profile.");
  const { profileid } = req.body;

  const child = Child.findbyId(profileid);

  if (!child) {
    return res.status(400).json({ message: "Enter a correct profile ID" });
  }

  try {
    await Child.findByIdAndDelete(profileid);

    await Organ.findByIdAndUpdate(
      child.organId,
      { $pull: { childrens: profileid } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Successfully deleted the profile" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting the profile" });
  }
};

module.exports = deleteProfileMiddleware;
