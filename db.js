const mysql = require("mysql2");
require("dotenv").config();

// Opret fobindelse
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test forbindelse
db.connect((err) => {
  if (err) {
    console.error("Database fejl:", err);
    return;
  }
  console.log("Forbundet til MySQL");
});

module.exports = db;