const db = require("../db");

// Hent alle brugere
exports.list = (req, res) => {
  db.query("SELECT * FROM Bruger", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Hent en bruger
exports.getOne = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM Bruger WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
};

// Opret bruger
exports.create = (req, res) => {
  const { navn, password, rolle } = req.body;

  db.query(
    "INSERT INTO Bruger (navn, password, rolle) VALUES (?, ?, ?)",
    [navn, password, rolle],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        id: result.insertId,
        navn,
        rolle
      });
    }
  );
};

// Opdater bruger
exports.update = (req, res) => {
  const id = req.params.id;
  const { navn, password, rolle } = req.body;

  db.query(
    "UPDATE Bruger SET navn = ?, password = ?, rolle = ? WHERE id = ?",
    [navn, password, rolle, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: result.affectedRows });
    }
  );
};

// Slet bruger
exports.delete = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM Bruger WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: result.affectedRows });
  });
};