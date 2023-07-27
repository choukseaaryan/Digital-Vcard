const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const QRCode = require("qrcode");

const app = express();
const port = 3003;

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3001", "http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const generateQRCode = async (values) => {
  let qrcode_data = "";
  const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${values.lastName};${values.firstName};;;
FN:${values.firstName} ${values.lastName}
ADR;TYPE=WORK,PREF:;;${values.address1} ${values.address2};;;;${values.city},${values.state};;${values.zipCode};;
TEL;TYPE=WORK:${values.contact}
EMAIL:${values.email}
URL:${values.website}
END:VCARD`;

  try {
    console.log("Generating QR code...");
    qrcode_data = await QRCode.toDataURL(vcfData);
    console.log("QR code data generated successfully!");
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
  return qrcode_data;
};

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vcard",
});

app.post("/form", async (req, res) => {
  const qrcode_data = await generateQRCode(req.body);
  const insertUsersSql =
    "INSERT INTO users (first_name, last_name, address, phone_number, email, employee_id, city, state, zipcode, position, website) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  const insertQrCodeSql =
    "UPDATE qr_code SET qrcode_data = \"?\" WHERE employee_id = ?;";

  pool.getConnection((err, connection) => {
    if (err) {
      return res.status(500).json("Database Connection Failed: \n" + err);
    }
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return res.status(500).json("Transaction Failed: \n" + err);
      }

      connection.query(
        insertUsersSql,
        [
          req.body.firstName,
          req.body.lastName,
          req.body.address,
          req.body.contact,
          req.body.email,
          req.body.employee_id,
          req.body.city,
          req.body.state,
          req.body.zipCode,
          req.body.position,
          req.body.website,
        ],
        (err, userData) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              return res.status(500).json("Registration Failed: \n" + err);
            });
          } else {
            connection.query(
              insertQrCodeSql,
              [qrcode_data, req.body.employee_id],
              (err) => {
                if (err) {
                  connection.rollback(() => {
                    connection.release();
                    return res
                      .status(500)
                      .json("Registration Failed: \n" + err);
                  });
                } else {
                  connection.commit((err) => {
                    if (err) {
                      connection.rollback(() => {
                        connection.release();
                        return res
                          .status(500)
                          .json("Transaction Commit Failed: \n" + err);
                      });
                    } else {
                      connection.release();
                      return res.json("Registration Successful!");
                    }
                  });
                }
              }
            );
          }
        }
      );
    });
  });
});

// API route to fetch data from the database
app.get("/api/data/users", (req, res) => {
  // Execute a query to fetch data from the database
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/data/qr_code", (req, res) => {
  // Execute a query to fetch data from the database
  pool.query("SELECT * FROM qr_code", (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.get("/vcard/:employee_id", (req, res) => {
  const employee_id = req.params.employee_id;
  const sql = "SELECT * FROM users WHERE employee_id = ?";

  pool.query(sql, [employee_id], (error, results) => {
    if (error) {
      console.error("Error fetching data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/delete-user/:id", (req, res) => {
  const id = req.params.id;

  const sqlUser = "DELETE FROM users WHERE employee_id = ?";
  const sqlQR = "DELETE FROM qr_code WHERE employee_id = ?";
  pool.query(sqlQR, [id], (error, results) => {
    if (error) {
      console.error("Error deleting qrcode data from the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      pool.query(sqlUser, [id], (error, results) => {
        if (error) {
          console.error("Error deleting user data from the database:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.json(results);
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
