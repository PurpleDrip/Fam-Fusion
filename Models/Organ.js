import mongoose, { Schema } from "mongoose";

const Organ = new Schema({
  organName: { type: String, required: true },
  organAddress: { type: String, required: true },
  organEmail: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "organ" },
  isAuth: { type: Boolean, default: false },
  isEmailValidated: { type: Boolean, default: false },
  childrens: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Child", default: [] },
  ],
  clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
  created: { type: Date, default: Date.now },
});

export default mongoose.model("Organ", Organ);
