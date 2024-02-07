require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const qrCodes = require("./routes/qrCode");
const mongoose = require("mongoose");

const { DATABASE_URL } = process.env;
const PORT = process.env.PORT || 3003;
console.log("db url: ", process.env.DATABASE_URL,  process.env.PORT);
router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/", qrCodes);

const app = express();
app.use(cors({ origin: "*" }));
app.use("/profiles", express.static(path.join(__dirname, "files/profiles")));
app.use("/QRCodes", express.static(path.join(__dirname, "files/QRCodes")));
app.use("/VCards", express.static(path.join(__dirname, "files/VCards")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1", router);

mongoose.set("strictQuery", false);

mongoose.connect(DATABASE_URL, {
	socketTimeoutMS: 0,
});

console.log("Connecting to MongoDb...");

mongoose.connection.on("connected", function () {
	console.log("Mongoose default connection open to " + DATABASE_URL);

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});

mongoose.connection.on("error", function (err) {
	console.log("Mongoose default connection error: " + err);
});

mongoose.connection.on("disconnected", function () {
	console.log("Mongoose default connection disconnected");
});

app.get("/", (req, res) => {
	res.send("Server is ready");
});
