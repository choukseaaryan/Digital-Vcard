const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors({
  credentials:true,
  origin:"http://localhost:3001",
  methods:["GET", "POST", "PUT","DELETE"],
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vcard",
});


app.post("/form", (req, res) => {
  const sql =
    "INSERT INTO users (first_name, last_name, address, phone_number, email, employee_id, city, zipcode, position, default_website) VALUES (?,?,?,?,?,?,?,?,?,?)";

  pool.query(
    sql,
    [
      req.body.firstName,
      req.body.lastName,
      (req.body.address1 + "\n" + req.body.address2),
      req.body.contact,
      req.body.email,
      req.body.employee_id,
      req.body.city,
      req.body.zipCode,
      req.body.position,
      req.body.website,
    ],
    (err, data) => {
      if (err) {
        return res.status(500).json("Registration Failed: \n" + err);
      } else {
        return res.json("Registration Successfully!");
      }
    }
  );
  // console.log(req.body);
  // res.status(200).json({message:"success"});
    
});

// app.get("/contacts", (req, res) => {
//   const sql = "SELECT * FROM users";
//   db.query(sql, (err, data) => {
//     if (err) {
//       return res.json("Can't fetch data: \n", err);
//     } else {
//       return res.json(data);
//     }
//   });
// });

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
