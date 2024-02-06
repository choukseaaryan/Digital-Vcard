const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
	fullName: { type: String, default: "" },
	email: {
		id: { type: String, default: "" },
		password: { type: String, default: "" },
	},
	company: { type: String, default: "" },
	phoneNumber: { type: String, default: "" },
});

module.exports = mongoose.model("admins", adminSchema);
