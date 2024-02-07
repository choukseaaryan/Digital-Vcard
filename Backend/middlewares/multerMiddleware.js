const multer = require("multer");
const path = require("path");
const fs = require("@cyclic.sh/s3fs");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const handleException = require("../utils/exception");
let upload;

try {
	// console.log("\n\n\n\nAWS_ACCESS_KEY_ID: ", process.env.AWS_ACCESS_KEY_ID);
	// const s3 = new AWS.S3();

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			// Define the destination directory for uploaded files
			const dir = path.join(
				__dirname,
				"../files/profiles",
				`${req.decoded.id}`
			);

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			cb(
				null,
				path.join(__dirname, "../files/profiles", `${req.decoded.id}`)
			);
		},
		filename: function (req, file, cb) {
			// Define the filename for uploaded files
			cb(null, `${req.body.employee_id}.png`);
		},
	});

	upload = multer({ storage: storage });

	// upload = multer({
	// 	storage: multerS3({
	// 		s3: s3,
	// 		bucket: process.env.AWS_BUCKET_NAME,
	// 		key: function (req, file, cb) {
	// 			cb(
	// 				null,
	// 				`profiles/${req.decoded.id}/${req.body.employee_id}.png`
	// 			);
	// 		},
	// 	}),
	// });
} catch (e) {
	console.log("Error in multerMiddleware: ", e);
	handleException(res, e);
}

module.exports = upload;
