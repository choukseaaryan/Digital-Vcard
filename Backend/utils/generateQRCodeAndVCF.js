const QRCode = require("qrcode");
const uploadFile = require("./uploadFile");

const generateQRCodeAndVCF = async (values) => {
	const userId = values._id;
	const adminId = values.adminId;

	const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${values.lastName};${values.firstName};;;
FN:${values.firstName} ${values.lastName}
ORG:${values.company}
TITLE:${values.position}
ADR;TYPE=WORK:;;${values.address1} ${values.address2};${values.city};${values.state};${values.zipCode};;
TEL;TYPE=WORK:${values.contact}
EMAIL;TYPE=WORK:${values.email}
URL:${values.website}
PHOTO;VALUE=URI:${values.profileUrl}
END:VCARD`;

	try {
		const qrcode_data = await QRCode.toDataURL(vcfData);

		const qrcodeArrayBuffer = Uint8Array.from(
			atob(qrcode_data.split(",")[1]),
			(c) => c.charCodeAt(0)
		).buffer;
		const qrCodeUrl = await uploadFile({
			file: qrcodeArrayBuffer,
			adminId,
			userId,
			location: "QRCodes",
		});

		const vcardArrayBuffer = new TextEncoder().encode(vcfData).buffer;
		const vcfUrl = await uploadFile({
			file: vcardArrayBuffer,
			adminId,
			userId,
			location: "VCards",
		});

		return { qrCodeUrl, vcfUrl };
	} catch (err) {
		console.error("Error generating QR code and VCard:", err);
	}
};

module.exports = generateQRCodeAndVCF;
