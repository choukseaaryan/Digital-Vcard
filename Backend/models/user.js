const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  adminId: { type: mongoose.Types.ObjectId, required: true, ref: "admins" },
	firstName: { type: String, default: "" },
	lastName: { type: String, default: "" },
	address: { type: String, default: "" },
	contact: { type: String, default: "" },
	email: { type: String, default: "" },
	employeeId: { type: String, default: "" },
	city: { type: String, default: "" },
	state: { type: String, default: "" },
	zipCode: { type: String, default: "" },
	position: { type: String, default: "" },
	website: { type: String, default: "" },
	company: { type: String, default: "" },
	profileUrl: { type: String, default: "" },
	vcfUrl: { type: String, default: "" },
});

module.exports = mongoose.model("users", userSchema);
