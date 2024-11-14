const OrganizationSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAuthenticated: { type: Boolean, default: false },
  isEmailValidated: { type: Boolean, default: false },
  childrens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Organ", OrganizationSchema);
