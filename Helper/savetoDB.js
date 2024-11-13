const savetoDB = async (res, user) => {
  try {
    await user.save();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error saving the user to the database" });
  }
};

module.exports = savetoDB;
