import mongoose, { Schema } from "mongoose";

const Child = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["Male", "Female", "Others"], required: true },
  bio: { type: String, required: true },
  description: { type: String, required: true },
  race: { type: String, required: true },
  nationality: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  healthStatus: { type: String },
  hobbies: [{ type: String, required: true }],
  imageUrl: { type: String },
  organId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organ",
    required: true,
  },
  isAdopted: { type: Boolean, default: false },
  adoptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  adoptionDate: { type: Date, default: null },
  created: { type: Date, default: Date.now },
});

export default mongoose.model("Child", Child);
