const dataModel = require("../models/dataModel");
const generateQRCode = require("../utils/generateQRCode");
const fs = require("fs");
const path = require("path");

const getUsersData = (req, res) => {
  dataModel.getUsers((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getQRCodeData = (req, res) => {
  dataModel.getQRCodeData((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getVCardData = (req, res) => {
  const employee_id = req.params.employee_id;
  dataModel.getVCardData(employee_id, (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getTotalClicks = (req, res) => {
  dataModel.getTotalClicks((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getEmailChartData = (req, res) => {
  dataModel.getEmailChartData((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getPhoneChartData = (req, res) => {
  dataModel.getPhoneChartData((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const getWebsiteChartData = (req, res) => {
  dataModel.getWebsiteChartData((error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const createUser = async (req, res) => {
  await generateQRCode(req.body);
  dataModel.createUser(req.body, (error, userData) => {
    if (error) {
      console.error("Registration Failed:", error);
      return res.status(500).json("Registration Failed");
    } else {
      return res.json("Registration Successful!");
    }
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  const profilePath = path.join(__dirname, "../profiles", `${id}.png`);
  const QRCodePath = path.join(__dirname, "../QRCodes", `${id}.png`);
  const VCardPath = path.join(__dirname, "../VCards", `${id}.png`);

  dataModel.deleteUser(id, (error, results) => {
    if (error) {
      console.error("Error deleting user data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      fs.unlink(profilePath, (err) => {
        if (err) {
          console.error("Error deleting profile image:", err);
        } else {
          fs.unlink(QRCodePath, (err) => {
            if (err) {
              console.error("Error deleting QR code image:", err);
            } else {
              fs.unlink(VCardPath, (err) => {
                if (err) {
                  console.error("Error deleting contact card:", err);
                } else {
                  console.log("User deleted successfully!");
                }
              });
            }
          });
        }
      });

      res.json(results);
    }
  });
};

const increaseEmailClicks = (req, res) => {
  const empID = req.body.id;
  dataModel.increaseEmailClicks(empID, (error, results) => {
    if (error) {
      console.error("Error updating email click count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const increasePhoneClicks = (req, res) => {
  const empID = req.body.id;
  dataModel.increasePhoneClicks(empID, (error, results) => {
    if (error) {
      console.error("Error updating phone click count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

const increaseWebsiteClicks = (req, res) => {
  const empID = req.body.id;
  dataModel.increaseWebsiteClicks(empID, (error, results) => {
    if (error) {
      console.error("Error updating website click count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getUsersData,
  getQRCodeData,
  getVCardData,
  getTotalClicks,
  getEmailChartData,
  getPhoneChartData,
  getWebsiteChartData,
  createUser,
  deleteUser,
  increaseEmailClicks,
  increasePhoneClicks,
  increaseWebsiteClicks,
};
