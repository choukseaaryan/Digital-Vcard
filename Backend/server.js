require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT || 3003;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const qrCodes = require("./routes/qrCode");

router.use("/", userRoutes);
router.use("/", adminRoutes);
router.use("/", qrCodes);

const app = express();
app.use(cors({ origin: "*" }));
app.use("/profiles", express.static(path.join(__dirname, "profiles")));
app.use("/QRCodes", express.static(path.join(__dirname, "QRCodes")));
app.use("/VCards", express.static(path.join(__dirname, "VCards")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/v1", router);

require("./config/db");

app.get("/", (req, res) => {
	res.send("Server is ready");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
