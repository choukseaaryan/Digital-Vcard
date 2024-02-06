const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination directory for uploaded files
    const dir = path.join(__dirname, "../profiles", `${req.decoded.id}`);
    
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, path.join(__dirname, "../profiles", `${req.decoded.id}`));
  },
  filename: function (req, file, cb) {
    // Define the filename for uploaded files
    cb(null, `${req.body.employee_id}.png`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
