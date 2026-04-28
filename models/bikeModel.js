const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");


db.run(`
    CREATE TABLE IF NOT EXISTS bikes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE,
        name TEXT,
        phone TEXT,
        email TEXT,
        description TEXT
    )
`);

module.exports = {
<<<<<<< HEAD
=======

    // Create reservation
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f
    createBike: (data, callback) => {
        db.run(
            "INSERT INTO bikes (code, name, phone, email, description) VALUES (?, ?, ?, ?, ?)",
            [data.code, data.name, data.phone, data.email, data.description],
            callback
        );
    },

<<<<<<< HEAD
    getBikeByCode: (code, callback) => {
        db.get("SELECT * FROM bikes WHERE code = ?", [code], callback);
=======
    // Get reservation by code
    getBikeByCode: (code, callback) => {
        db.get("SELECT * FROM bikes WHERE code = ?", [code], callback);
    },

    // Get all reservations
    getAllBikes: (callback) => {
        db.all("SELECT * FROM bikes", [], (err, rows) => {
            callback(err, rows);
        });
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f
    }
};
