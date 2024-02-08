const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/user");
const { upload } = require("../middlewares/multerMiddleware");
const { verifyToken } = require("../middlewares/auth");


userRouter.get("/get-users", verifyToken, userController.getAllUsers);
userRouter.post("/create-user", verifyToken, upload, userController.createUser);
userRouter.post("/delete-user/:id", verifyToken, userController.deleteUser);
// userRouter.post("/update-user/:id", verifyToken, userController.updateUser);
userRouter.get("/get-user/:company/:employeeId", userController.getOneUser);


module.exports = userRouter;