const pool = require("../config/db");

const getUsers = (callback) => {
  const sql = "SELECT * FROM users";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getQRCodeData = (callback) => {
  const sql = "SELECT * FROM qr_code";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getVCardData = (employee_id, callback) => {
  const sql = "SELECT * FROM users WHERE employee_id = ?";
  pool.query(sql, [employee_id], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getTotalClicks = (callback) => {
  const sql =
    "SELECT total_clicks_email, total_clicks_phone, total_clicks_website, total_clicks_email + total_clicks_phone + total_clicks_website AS total_clicks FROM ( SELECT SUM(clicks_email) AS total_clicks_email, SUM(clicks_phone) AS total_clicks_phone, SUM(clicks_website) AS total_clicks_website FROM qr_code) AS subquery;";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getEmailChartData = (callback) => {
  const sql = "SELECT employee_id as x, clicks_email as y FROM qr_code";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getPhoneChartData = (callback) => {
  const sql = "SELECT employee_id as x, clicks_phone as y FROM qr_code";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const getWebsiteChartData = (callback) => {
  const sql = "SELECT employee_id as x, clicks_website as y FROM qr_code";
  pool.query(sql, (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const createUser = (userData, callback) => {
  const insertUsersSql =
    "INSERT INTO users (first_name, last_name, address, phone_number, email, employee_id, city, state, zipcode, position, website, company) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  pool.query(
    insertUsersSql,
    [
      userData.firstName,
      userData.lastName,
      `${userData.address1}, ${userData.address2}`,
      userData.contact,
      userData.email,
      userData.employee_id,
      userData.city,
      userData.state,
      userData.zipCode,
      userData.position,
      userData.website,
      userData.company
    ],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

const deleteUser = (id, callback) => {
  const sqlUser = "DELETE FROM users WHERE employee_id = ?";
  const sqlQR = "DELETE FROM qr_code WHERE employee_id = ?";
  pool.query(sqlQR, [id], (error, results) => {
    if (error) {
      return callback(error);
    }
    pool.query(sqlUser, [id], (error, results) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  });
};

const increaseEmailClicks = (empID, callback) => {
  const sql =
    "UPDATE qr_code SET clicks_email = clicks_email + 1, total_clicks = total_clicks + 1 WHERE employee_id = ?";
  pool.query(sql, [empID], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const increasePhoneClicks = (empID, callback) => {
  const sql =
    "UPDATE qr_code SET clicks_phone = clicks_phone + 1, total_clicks = total_clicks + 1 WHERE employee_id = ?";
  pool.query(sql, [empID], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const increaseWebsiteClicks = (empID, callback) => {
  const sql =
    "UPDATE qr_code SET clicks_website = clicks_website + 1, total_clicks = total_clicks + 1 WHERE employee_id = ?";
  pool.query(sql, [empID], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

const insertQrCodeData = (qrcode_data, employee_id, callback) => {
  const sql = "UPDATE qr_code SET qrcode_data = ? WHERE employee_id = ?";
  pool.query(sql, [qrcode_data, employee_id], (error, results) => {
    if (error) {
      return callback(error);
    }
    return callback(null, results);
  });
};

module.exports = {
  getUsers,
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
  insertQrCodeData
};
