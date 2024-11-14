const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAuthenticated: { type: Boolean, default: false },
  isEmailValidated: { type: Boolean, default: false },
  adoptedList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
