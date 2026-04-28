const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Åbn database
const db = new sqlite3.Database("./database.db", (err) => {
    console.log("Database path in use:", path.resolve("./database.db"));

    if (err) {
        console.error("Fejl ved forbindelse til database:", err.message);
    } else {
        console.log("Forbundet til SQLite database.");
    }
});

// Opret tabeller hvis de ikke findes
db.serialize(() => {

    // Bikes
    db.run(`
        CREATE TABLE IF NOT EXISTS bikes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT,
            name TEXT,
            phone TEXT,
            email TEXT,
            description TEXT
        )
    `);

    // Tasks
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending'
        )
    `);

    // Users
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

});

module.exports = db;
