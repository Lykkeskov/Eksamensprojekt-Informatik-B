const db = require("../db");
const bcrypt = require("bcrypt");

module.exports = {

  getUserByName: (navn, callback) => {
    const sql = "SELECT * FROM Bruger WHERE navn = ?";

    db.query(sql, [navn], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  createUser: async (data, callback) => {
    try {
      const hash = await bcrypt.hash(data.password, 10);

      const sql = `
        INSERT INTO Bruger (navn, rolle, password)
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