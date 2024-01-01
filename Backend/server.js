const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3003;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:3002", "*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/profiles", express.static(path.join(__dirname, "profiles")));
app.use("/QRCodes", express.static(path.join(__dirname, "QRCodes")));
app.use("/VCards", express.static(path.join(__dirname, "VCards")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dataRoutes = require("./routes/dataRoutes");
app.use("/", dataRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
