const { Router } = require("express");
const qrCodeRouter = Router();
const qrCodeController = require("../controllers/qrCode");
const { verifyToken } = require("../middlewares/auth");

qrCodeRouter.get("/get-qr-codes", verifyToken, qrCodeController.getQRCodeData);
// qrCodeRouter.get("/get-sum-of-clicks", verifyToken, qrCodeController.getSumOfClicks);
// qrCodeRouter.get("/get-total-clicks", verifyToken, qrCodeController.getTotalClicks);
qrCodeRouter.post("/update-qr-code/:id", verifyToken, qrCodeController.updateQRCodeData);

module.exports = qrCodeRouter;