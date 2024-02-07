const generateQRCode = require("../utils/generateQRCode");
const response = require("../utils/response");
const handleException = require("../utils/exception");
const userModel = require("../models/user");
const deleteFiles = require("../utils/deleteFiles");
const qrCodeModel = require("../models/qrCode");

const createUser = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			contact,
			address1,
			address2,
			city,
			state,
			zipCode,
			website,
			company,
			employeeId,
			position,
		} = req.body;
		const adminId = req.decoded.id;
		
		
		const existingUser = await userModel.findOne({
			adminId,
			employeeId,
		});
		
		if (existingUser) {
			return response.error({
				res,
				msg: "User already exists with this Employee ID",
			});
		}
		
		const newUser = await userModel.create({
			adminId,
			firstName,
			lastName,
			address: `${address1} ${address2}`,
			contact,
			email,
			employeeId,
			city,
			state,
			zipCode,
			position,
			website,
			company,
		});
		
		if (!newUser) {
			return response.error({
				res,
				msg: "Failed to create user. Please try again later",
			});
		}

		await generateQRCode(newUser);
		const qrCode = await qrCodeModel.create({
			adminId,
			userId: newUser._id,
			employeeId,
		});

		if (!qrCode) {
			return response.error({
				res,
				msg: "User created but failed to create QR Code",
			});
		}

		return response.success({
			res,
			msg: "User created successfully",
			data: newUser,
		});
	} catch (error) {
		console.error("Registration Failed:", error);
		handleException(res, error);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const { adminId } = req.decoded;
		const users = await userModel.find({ adminId });

		if (!users) {
			return response.error({
				res,
				msg: "No users found.",
				data: [],
			});
		}

		users.sort((a, b) => a.employeeId.localeCompare(b.employeeId));
		

		return response.success({
			res,
			msg: "Users fetched successfully",
			data: users,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		handleException(res, error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await userModel.findByIdAndDelete(id);

		if (!user) {
			return response.error({
				res,
				msg: "User not found",
			});
		}

		const qrCode = await qrCodeModel.findOneAndDelete({ userId: id });

		if (!qrCode) {
			return response.error({
				res,
				msg: "User deleted but failed to delete QR Code",
			});
		}

		await deleteFiles(user.employeeId, user.adminId);

		return response.success({
			res,
			msg: "User deleted successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		handleException(res, error);
	}
};

const getOneUser = async (req, res) => {
	try {
		const { employeeId, company } = req.params;
		const user = await userModel.findOne({ employeeId, company });

		if (!user) {
			return response.error({
				res,
				msg: "User not found",
			});
		}

		return response.success({
			res,
			msg: "User fetched successfully",
			data: user,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		handleException(res, error);
	}
};

module.exports = {
	createUser,
	getAllUsers,
	deleteUser,
	getOneUser,
};
