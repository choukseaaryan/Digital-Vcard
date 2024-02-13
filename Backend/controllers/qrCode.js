const response = require("../utils/response");
const handleException = require("../utils/exception");
const qrCodeModel = require("../models/qrCode");

const getQRCodeData = async (req, res) => {
	try {
		const adminId = req.decoded.id;
		const qrCodeData = await qrCodeModel.find({ adminId });

		if (!qrCodeData) {
			return response.error({
				res,
				msg: "No QR Code Data Found",
			});
		}

		qrCodeData.sort((a, b) => a.employeeId.localeCompare(b.employeeId));

		return response.success({
			res,
			msg: "QR Code Data Found",
			data: qrCodeData,
		});
	} catch (err) {
		console.log("Error occured in getQRCodeData: ", err);
		handleException(res, err);
	}
};

const updateQRCodeData = async (req, res) => {
	try {
		const { userId, key } = req.body;

		const qrCodeData = await qrCodeModel.findOne({ userId });
		if (!qrCodeData) {
			return response.error({
				res,
				msg: "QR Code Data Not Found",
			});
		}

		if (["clicksEmail", "clicksPhone", "clicksWebsite"].includes(key)) {
			qrCodeData[key] += 1;
			qrCodeData.totalClicks += 1;
			await qrCodeData.save();
		} else {
			return response.error({
				res,
				msg: "Invalid key",
			});
		}

		return response.success({
			res,
		});
	} catch (err) {
		console.log("Error occured in updateQRCodeData: ", err);
		handleException(res, err);
	}
};

const getSumOfClicks = async (req, res) => {
	try {
		const adminId = req.decoded.id;
		const qrCodeData = await qrCodeModel.find({ adminId });

		if (!qrCodeData) {
			return response.error({
				res,
				msg: "No QR Code Data Found",
			});
		}

		const sumOfClicks = qrCodeData.reduce(
			(acc, curr) => {
				acc.clicksEmail += curr.clicksEmail;
				acc.clicksPhone += curr.clicksPhone;
				acc.clicksWebsite += curr.clicksWebsite;
				acc.totalClicks += curr.totalClicks;
				return acc;
			},
			{ clicksEmail: 0, clicksPhone: 0, clicksWebsite: 0, totalClicks: 0 }
		);

		return response.success({
			res,
			msg: "Sum of Clicks Found",
			data: sumOfClicks,
		});
	} catch (err) {
		console.log("Error occured in getSumOfClicks: ", err);
		handleException(res, err);
	}
};

const getLineChartData = async (req, res) => {
	try {
		const adminId = req.decoded.id;
		const qrCodeData = await qrCodeModel.find({ adminId });

		if (!qrCodeData) {
			return response.error({
				res,
				msg: "No QR Code Data Found",
			});
		}

		const data = qrCodeData.map((data) => ({
			x: data.employeeId,
			yEmail: data.clicksEmail,
			yPhone: data.clicksPhone,
			yWebsite: data.clicksWebsite,
		}));

		data.sort((a, b) => a.x.localeCompare(b.x));

		return response.success({
			res,
			msg: "Line Chart Data Found",
			data: data,
		});
	} catch (err) {
		console.log("Error occured in getLineChartData: ", err);
		handleException(res, err);
	}
};

const getTotalClicksPerUser = async (req, res) => {
	try {
		const adminId = req.decoded.id;
		const qrCodeData = await qrCodeModel.find({ adminId });

		if (!qrCodeData) {
			return response.error({
				res,
				msg: "No QR Code Data Found",
			});
		}

		const totalClicksPerUser = qrCodeData.map((data) => ({
			employeeId: data.employeeId,
			totalClicks: parseInt(data.totalClicks),
		}));

		totalClicksPerUser.sort((a, b) => a.employeeId.localeCompare(b.employeeId));

		return response.success({
			res,
			msg: "Total Clicks Per User Found",
			data: totalClicksPerUser,
		});
	} catch (err) {
		console.log("Error occured in getTotalClicksPerUser: ", err);
		handleException(res, err);
	}
};

module.exports = {
	getQRCodeData,
	updateQRCodeData,
	getSumOfClicks,
	getLineChartData,
	getTotalClicksPerUser,
};
