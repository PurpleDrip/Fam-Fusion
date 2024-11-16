import mongoose, { Schema } from "mongoose";

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  address: { type: String, required: true },
  isAuth: { type: Boolean, default: false },
  isEmailValidated: { type: Boolean, default: false },
  adoptedCount: { type: Number, default: 0 },
  isPremiumMember: { type: Boolean, default: false },
  hasAdopted: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Child", default: [] },
  ],
  created: { type: Date, default: Date.now },
});

export default mongoose.model("User", User);
