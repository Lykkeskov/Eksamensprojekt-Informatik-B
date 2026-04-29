const db = require("../db");

// Hent alle reservedele
exports.list = (req, res) => {
    db.query("SELECT * FROM Reservedele", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Opret reservedel
exports.create = (req, res) => {
    const { navn, antal } = req.body;

    const sql = `
        INSERT INTO Reservedele (navn, antal)
        VALUES (?, ?)
    `;

    db.query(sql, [navn, antal], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            id: result.insertId,
            navn,
            antal
        });
    });
};

// Opdater reservedel
exports.update = (req, res) => {
    const id = req.params.id;
    const { navn, antal } = req.body;

    const sql = `
        UPDATE Reservedele
        SET navn = ?, antal = ?
        WHERE id = ?
    `;

    db.query(sql, [navn, antal, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: result.affectedRows });
    });
};

// Slet reservedel
exports.delete = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM Reservedele WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: result.affectedRows });
    });
};