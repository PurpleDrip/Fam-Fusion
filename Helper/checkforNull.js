const checkforNull = (res, ...values) => {
  for (const value of values) {
    if (value == null || value === "") {
      res.status(400).json({ message: "Please enter all the required values" });
      return true;
    }
  }
  return false;
};

module.exports = checkforNull;
