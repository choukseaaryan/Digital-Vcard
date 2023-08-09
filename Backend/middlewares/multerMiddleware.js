const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for uploaded files
    cb(null, path.join(__dirname, "../profiles"));
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files
    cb(null, `${req.params.empID}.png`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
