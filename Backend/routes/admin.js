const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/admin");

adminRouter.post("/signup-admin", adminController.signup);
adminRouter.post("/login", adminController.login);

module.exports = adminRouter;