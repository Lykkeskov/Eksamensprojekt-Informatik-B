const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");

module.exports = {
    getUser: (username, callback) => {
        db.get("SELECT * FROM users WHERE username = ?", [username], callback);
    },

    createUser: (username, hashedPassword) => {
        db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    }
};
