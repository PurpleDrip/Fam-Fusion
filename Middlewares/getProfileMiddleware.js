const Child = require("../Models/Child");

const getProfileMiddleware = async (req, res) => {
  console.log("Got a GET profile request.");

  const { id } = req.params;
  try {
    if (id) {
      const child = await Child.findById(id);
      if (!child) {
        return res.status(404).json({ message: "Child profile not found" });
      }
      return res.status(200).json(child);
    }

    const childrens = await Child.find();

    return res.status(200).json(childrens);
  } catch (err) {
    return res.status(500).json({ message: "Error accessing the db" });
  }
};

module.exports = getProfileMiddleware;
