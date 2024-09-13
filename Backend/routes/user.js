const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/user");
const { upload } = require("../middlewares/multerMiddleware");
const { verifyToken } = require("../middlewares/auth");


userRouter.get("/get-users", verifyToken, userController.getAllUsers);
userRouter.get("/get-user-by-id/:id", userController.getUserById);
userRouter.get("/get-user/:company/:employeeId", userController.getUserByCompany);
userRouter.post("/create-user", verifyToken, upload, userController.createUser);
userRouter.post("/update-user/:id", verifyToken, upload, userController.updateUser);
userRouter.post("/delete-user/:id", verifyToken, userController.deleteUser);


module.exports = userRouter;