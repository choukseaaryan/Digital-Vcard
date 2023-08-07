const QRCode = require("qrcode");

const generateQRCode = async (values) => {
  let qrcode_data = "";
  const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${values.lastName};${values.firstName};;;
FN:${values.firstName} ${values.lastName}
ADR;TYPE=WORK:;;${values.address1} ${values.address2};${values.city};${values.state};${values.zipCode};;
TEL;TYPE=WORK:${values.contact}
EMAIL;TYPE=WORK:${values.email}
URL:${values.website}
END:VCARD`;

  try {
    console.log("Generating QR code...");
    qrcode_data = await QRCode.toDataURL(vcfData);
    console.log("QR code data generated successfully!");
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
  return qrcode_data;
};

module.exports = generateQRCode;
