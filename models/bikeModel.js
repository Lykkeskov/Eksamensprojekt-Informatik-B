const db = require("../db");

module.exports.getAllReservations = (callback) => {
    db.query("SELECT * FROM reservation ORDER BY id DESC", callback);
};

module.exports.createReservation = (data, callback) => {
    db.query(
        "INSERT INTO reservation (code, name, email, phone, description) VALUES (?, ?, ?, ?, ?)",
        [data.code, data.name, data.email, data.phone, data.description],
        callback
    );
};

module.exports.deleteReservation = (id, callback) => {
    db.query("DELETE FROM reservation WHERE id = ?", [id], callback);
};

module.exports.getReservationByCode = (code, callback) => {
    db.query("SELECT * FROM reservation WHERE code = ?", [code], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};
