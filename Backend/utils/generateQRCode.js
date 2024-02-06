const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const generateQRCode = async (values) => {
  const employeeId = values.employeeId;
  const adminId = values.adminId;
  const qrCodePath = path.join(__dirname, "..", "QRCodes", `${adminId}`, `${employeeId}.png`);
  const vCardPath = path.join(__dirname, ".." , "VCards", `${adminId}`, `${employeeId}.vcf`);

  const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${values.lastName};${values.firstName};;;
FN:${values.firstName} ${values.lastName}
ORG:${values.company}
TITLE:${values.position}
ADR;TYPE=WORK:;;${values.address};${values.city};${values.state};${values.zipCode};;
TEL;TYPE=WORK:${values.contact}
EMAIL;TYPE=WORK:${values.email}
URL:${values.website}
END:VCARD`;

  try {
    console.log("Generating QR code...");
    const qrcode_data = await QRCode.toDataURL(vcfData);
    console.log("QR code data generated successfully!");

    // Save QR code image to QRCodes folder
    await fs.promises.mkdir(path.dirname(qrCodePath), { recursive: true });
    await fs.promises.writeFile(qrCodePath, qrcode_data.split(",")[1], "base64");

    // Save VCard data to VCards folder
    await fs.promises.mkdir(path.dirname(vCardPath), { recursive: true });
    await fs.promises.writeFile(vCardPath, vcfData);

    console.log(`QR code and VCard saved for employee ${employeeId}`);
  } catch (err) {
    console.error("Error generating QR code and VCard:", err);
  }
};

module.exports = generateQRCode;
