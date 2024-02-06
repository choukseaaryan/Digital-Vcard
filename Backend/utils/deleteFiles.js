const fs = require("fs");
const path = require("path");

const deleteFiles = async (employeeId, adminId) => {
  const profilePath = path.join(__dirname, "..", "profiles", `${adminId}`,  `${employeeId}.png`);
  const qrCodePath = path.join(__dirname, "..", "QRCodes", `${adminId}`, `${employeeId}.png`);
  const vCardPath = path.join(__dirname, "..", "VCards", `${adminId}`, `${employeeId}.vcf`);

  try {
    console.log("Deleting QR code, Profile Picture and VCard...");
    await fs.promises.unlink(profilePath);
    await fs.promises.unlink(qrCodePath);
    await fs.promises.unlink(vCardPath);
    console.log(`QR code, Profile Picture and VCard deleted for employee ${employeeId}`);
  } catch (err) {
    console.error("Error deleting QR code, Profile Picture and VCard:", err);
  }
}

module.exports = deleteFiles;