const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "vcard",
});

module.exports = pool;
