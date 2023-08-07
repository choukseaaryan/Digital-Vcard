const express = require("express");
const router = express.Router();
const dataController = require("../controllers/dataController");
const upload = require("../middlewares/multerMiddleware");

router.get("/api/data/users", dataController.getUsersData);
router.get("/api/data/qr_code", dataController.getQRCodeData);
router.get("/vcard/:employee_id", dataController.getVCardData);
router.get("/clicks/totalClicks", dataController.getTotalClicks);
router.get("/api/data/lineChartData/emailData", dataController.getEmailChartData);
router.get("/api/data/lineChartData/phoneData", dataController.getPhoneChartData);
router.get("/api/data/lineChartData/websiteData", dataController.getWebsiteChartData);
router.post("/form/:empID", upload.single("image"), dataController.createUser);
router.post("/delete-user/:id", dataController.deleteUser);
router.post("/clicks/emailButtonClick", dataController.increaseEmailClicks);
router.post("/clicks/phoneButtonClick", dataController.increasePhoneClicks);
router.post("/clicks/websiteButtonClick", dataController.increaseWebsiteClicks);

module.exports = router;
