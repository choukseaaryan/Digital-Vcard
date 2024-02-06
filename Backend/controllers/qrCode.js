const response = require("../utils/response");
const handleException = require("../utils/exception");
const qrCodeModel = require("../models/qrCode");

const getQRCodeData = async (req, res) => {
	try {
		const adminId = req.decoded.id;
		const qrCodeData = await qrCodeModel.find({adminId});

		if (!qrCodeData) {
			return response.error({
				res,
				msg: "No QR Code Data Found",
			});
		}

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
		const { userId, key } = req.params;

    const qrCodeData = await qrCodeModel.findOne(userId);
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
			msg: "QR Code Data Updated",
			data: qrCodeData,
		});
	} catch (err) {
		console.log("Error occured in updateQRCodeData: ", err);
		handleException(res, err);
	}
};

module.exports = {
	getQRCodeData,
  updateQRCodeData,
};
