const { Router } = require("express");
const qrCodeRouter = Router();
const qrCodeController = require("../controllers/qrCode");
const { verifyToken } = require("../middlewares/auth");

qrCodeRouter.get("/get-qr-codes", verifyToken, qrCodeController.getQRCodeData);
qrCodeRouter.get("/get-sum-of-clicks", verifyToken, qrCodeController.getSumOfClicks);
qrCodeRouter.get("/get-line-chart-data", verifyToken, qrCodeController.getLineChartData);
qrCodeRouter.get("/get-total-clicks-per-user", verifyToken, qrCodeController.getTotalClicksPerUser);
qrCodeRouter.post("/update-qr-code/", qrCodeController.updateQRCodeData);

module.exports = qrCodeRouter;