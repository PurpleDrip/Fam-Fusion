import Child from "../Models/Child.js";
import Organ from "../Models/Organ.js";

const filteredProfileMiddleware = async (req, res, next) => {
  const { filter, value, minAge, maxAge } = req.params;
  try {
    if (filter === "organName") {
      const organ = await Organ.findOne({ organName: value });
      if (!organ) {
        return res.status(404).json({ message: `No organ with name ${value}` });
      }
      const childArray = [];

      for (const childrenId of organ.childrens) {
        const child = await Child.findById(childrenId);
        if (child) {
          childArray.push(child);
        }
      }

      return res.status(200).json(childArray);
    }
    if (minAge && maxAge) {
      const profiles = await Child.find({
        age: { $gte: minAge, $lte: maxAge },
      });
    }
    const profiles = await Child.find({ [filter]: value });
    if (!profiles.length) {
      return res
        .status(404)
        .json({ message: `No profiles with ${filter} ${value}` });
    }
    return res.status(200).json(profiles);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default filteredProfileMiddleware;
