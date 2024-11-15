const mongoose = require("mongoose");

const ChildProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
  hobby: { type: String },
  race: { type: String },
  healthStatus: { type: String },
  bio: { type: String },
  profilePic: { type: String },
  adoptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  isAdopted: { type: Boolean, default: false },
  organId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Child", ChildProfileSchema);
