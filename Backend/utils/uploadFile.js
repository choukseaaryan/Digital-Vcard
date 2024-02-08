const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../config/firebase.config");

const uploadFile = async ({ file, adminId, userId, location }) => {
	try {
		const storageFB = getStorage();
		let contentType;
		let fileBuffer;

		switch (location) {
			case "profiles":
				contentType = file.type;
				fileBuffer = file.buffer;
				break;
			case "QRCodes":
				contentType = "image/png";
				fileBuffer = file;
				break;
			case "VCards":
				contentType = "text/vcard";
				fileBuffer = file;
				break;
			default:
				contentType = file.type;
				fileBuffer = file.buffer;
				break;
		}

		await signInWithEmailAndPassword(
			auth,
			process.env.FIREBASE_USER,
			process.env.FIREBASE_AUTH
		);

		const fileName = `${location}/${adminId}/${userId}`;
		const storageRef = ref(storageFB, fileName);
		const metadata = {
			contentType: contentType,
		};

		await uploadBytesResumable(storageRef, fileBuffer, metadata);
		return fileName;
	} catch (error) {
		console.error("Failed to upload file:", error);
		return null;
	}
};

module.exports = uploadFile;
