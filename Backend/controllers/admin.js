const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const handleException = require("../utils/exception");
const adminModel = require("../models/admin");
const jwtSecret = process.env.JWT_SECRET;

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let adminData = await adminModel.findOne({ "email.id": email });

		if (!adminData) {
			const obj = {
				res,
				msg: "Email Does Not Exist",
			};

			return response.error(obj);
		}

		if (!bcrypt.compareSync(password, adminData?.email?.password)) {
			const obj = {
				res,
				msg: "Incorrect Password",
			};

			return response.error(obj);
		}

		adminData = {
			...adminData,
			token: jwt.sign({ id: adminData._id }, jwtSecret, {
				expiresIn: "24h",
			}),
		};

		const obj = {
			res,
			msg: "Login Successful",
			data: adminData,
		};
		return response.success(obj);
	} catch (err) {
		console.log("Error occured in login: ", err);
		handleException(res, err);
	}
};

const signup = async (req, res) => {
	try {
		const { fullName, email, password, phoneNumber, company } = req.body;

		const adminData = await adminModel.findOne({ "email.id": email });

		if (adminData) {
			const obj = {
				res,
				msg: "Email Already Exists",
			};

			return response.error(obj);
		}

		const passwordHash = bcrypt.hashSync(password, 10);

		const newAdminData = await adminModel.create({
			fullName,
			email: {
				id: email,
				password: passwordHash,
			},
			phoneNumber,
			company,
		});

		const obj = {
			res,
			msg: "Registration Successful",
			data: newAdminData,
		};

		return response.success(obj);
	} catch (err) {
		console.log("Error occured in signup: ", err);
		handleException(res, err);
	}
};

module.exports = {
	login,
	signup,
};
