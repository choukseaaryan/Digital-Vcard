const QRCode = require("qrcode");
const fs = require("@cyclic.sh/s3fs/promises");
const path = require("path");
// const AWS = require("aws-sdk");

// const s3 = new AWS.S3({
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// 	region: process.env.AWS_REGION,
// });

const generateQRCode = async (values) => {
	const employeeId = values.employeeId;
	const adminId = values.adminId;
	const qrCodePath = path.join(
		__dirname,
		"../files/QRCodes",
		`${adminId}`,
		`${employeeId}.png`
	);
	const vCardPath = path.join(
		__dirname,
		"../files/VCards",
		`${adminId}`,
		`${employeeId}.vcf`
	);

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

		// // Upload QR code image to S3 bucket
		// const qrCodeParams = {
		// 	Bucket: process.env.AWS_BUCKET_NAME,
		// 	Key: `files/QRCodes/${adminId}/${employeeId}.png`,
		// 	Body: Buffer.from(qrcode_data.split(",")[1], "base64"),
		// 	ContentType: "image/png",
		// };
		// await s3.upload(qrCodeParams).promise();

		// // Upload VCard data to S3 bucket
		// const vCardParams = {
		// 	Bucket: "your-bucket-name",
		// 	Key: `files/VCards/${adminId}/${employeeId}.vcf`,
		// 	Body: vcfData,
		// 	ContentType: "text/vcard",
		// };
		// await s3.upload(vCardParams).promise();

		console.log(`QR code and VCard saved for employee ${employeeId}`);
	} catch (err) {
		console.error("Error generating QR code and VCard:", err);
	}
};

module.exports = generateQRCode;
