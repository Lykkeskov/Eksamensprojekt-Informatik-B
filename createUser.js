const bcrypt = require("bcrypt");
const db = require("./db");

const navn = "admin";
const password = "password123";
const rolle = "admin";

async function createUser() {
  try {
    const hash = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO bruger (navn, rolle, password)
      VALUES (?, ?, ?)
    `;

    db.query(sql, [navn, rolle, hash], (err, result) => {
      if (err) {
        console.error("Fejl:", err);
      } else {
        console.log("Bruger oprettet!");
      }
      process.exit();
    });
  } catch (err) {
    console.error("Hash fejl:", err);
  }
}

createUser();
