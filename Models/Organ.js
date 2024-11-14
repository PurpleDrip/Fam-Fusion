const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const Organ = new Schema({
  O_Name: { type: String, required: true },
  O_Email: { type: String, required: true },
  O_Password: { type: String, required: true },
});

module.exports = mongoose.model("Organ", Organ);
