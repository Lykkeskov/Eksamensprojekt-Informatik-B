const db = require("../db");
const bcrypt = require("bcrypt");

module.exports = {

  getUserByName: (navn, callback) => {
    // FIXED: bruger (lowercase) to match your actual table
    const sql = "SELECT * FROM bruger WHERE navn = ?";

    db.query(sql, [navn], (err, results) => {
      if (err) return callback(err);

      if (results.length === 0) {
        return callback(null, null);
      }

      callback(null, results[0]);
    });
  },

  createUser: async (data, callback) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);

      // FIXED: bruger (lowercase)
      const sql = `
        INSERT INTO bruger (navn, rolle, password)
        VALUES (?, ?, ?)
      `;

      db.query(sql, [data.navn, data.rolle, hash], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      });

    } catch (err) {
      callback(err);
    }
  }
};
