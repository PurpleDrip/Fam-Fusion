import mongoose, { Schema } from "mongoose";

const User = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  address: { type: String, required: true },
  isAuth: { type: Boolean, required: true, default: false },
  adoptedCount: { type: Number, default: 0 },
  isPremiumMember: { type: Boolean, default: false },
  hasAdopted: [{ type: Schema.Types.ObjectId, ref: "Child", default: [] }],
  created: { type: Date, default: Date.now },
});

export default mongoose.model("User", User);
