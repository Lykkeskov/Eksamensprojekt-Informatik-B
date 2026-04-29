const db = require("../db");

module.exports = {

  // Opret cykel
  createBike: (data, callback) => {
    const sql = `
      INSERT INTO cykel (id, type, status, beskrivelse)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.id,
        data.type,
        data.status,
        data.beskrivelse
      ],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      }
    );
  },

  // Hent cykel via id
  getBikeById: (id, callback) => {
    const sql = "SELECT * FROM cykel WHERE id = ?";

    db.query(sql, [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },

  // Hent alle cykler
  getAllBikes: (callback) => {
    const sql = "SELECT * FROM cykel";

    db.query(sql, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
};