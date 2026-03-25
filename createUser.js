const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

// Open database
const db = new sqlite3.Database("./database.db");

// CHANGE THESE TO CREATE A NEW USER
const username = "admin";
const password = "password123";

// 1. Create users table if it doesn't exist
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`, (err) => {
    if (err) {
        console.error("Error creating table:", err);
        return;
    }

    // 2. Hash password and insert user
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return;
        }

        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hash],
            function (err) {
                if (err) {
                    console.error("Error inserting user:", err);
                } else {
                    console.log(`User '${username}' created successfully!`);
                }
                db.close();
            }
        );
    });
});
