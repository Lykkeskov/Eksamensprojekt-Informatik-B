const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error("Fejl ved forbindelse til database:", err.message);
    } else {
        console.log("Forbundet til SQLite database.");
    }
});

module.exports = db;
