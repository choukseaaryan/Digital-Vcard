const { getStorage, ref, deleteObject } = require("firebase/storage");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require("../config/firebase.config");

const deleteFile = async ({ adminId, userId, location }) => {
	try {
		const storageFB = getStorage();

		await signInWithEmailAndPassword(
			auth,
			process.env.FIREBASE_USER,
			process.env.FIREBASE_AUTH
		);

		const fileName = `${location}/${adminId}/${userId}`;
		const fileRef = ref(storageFB, fileName);

		await deleteObject(fileRef);

		return fileName;
	} catch (error) {
		console.error("Failed to delete file:", error);
    return null;
	}
};

module.exports = deleteFile;
