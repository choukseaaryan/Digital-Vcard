const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  adminId: { type: mongoose.Types.ObjectId, required: true, ref: "admins" },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  employeeId: { type: String, default: "" },
  clicksEmail: { type: Number, default: 0 },
  clicksPhone: { type: Number, default: 0 },
  clicksWebsite: { type: Number, default: 0 },
  totalClicks: { type: Number, default: 0 },
});

module.exports = mongoose.model("qrCodes", qrCodeSchema);