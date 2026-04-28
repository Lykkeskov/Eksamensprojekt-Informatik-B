const db = require("../db");

// Hent alle tasks
exports.list = (req, res) => {
    const sql = `
        SELECT Opgave.*, Cykel.type AS cykel_type, Bruger.navn AS bruger_navn
        FROM Opgave
        LEFT JOIN Cykel ON Opgave.cykel_id = Cykel.id
        LEFT JOIN Bruger ON Opgave.bruger_id = Bruger.id
    `;

    db.query(sql, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Hent én task
exports.getOne = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM Opgave WHERE id = ?";

    db.query(sql, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows[0]);
    });
};

// Hent tasks for en bestemt cykel
exports.getByBike = (req, res) => {
    const bikeId = req.params.bikeId;

    const sql = "SELECT * FROM Opgave WHERE cykel_id = ?";

    db.query(sql, [bikeId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Opret task
exports.create = (req, res) => {
    const { titel, status, cykel_id, bruger_id } = req.body;

    const sql = `
        INSERT INTO Opgave (titel, status, cykel_id, bruger_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [titel, status, cykel_id, bruger_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
            id: result.insertId,
            titel,
            status,
            cykel_id,
            bruger_id
        });
    });
};

// Opdater task
exports.update = (req, res) => {
    const id = req.params.id;
    const { titel, status, cykel_id, bruger_id } = req.body;

    const sql = `
        UPDATE Opgave
        SET titel = ?, status = ?, cykel_id = ?, bruger_id = ?
        WHERE id = ?
    `;

    db.query(sql, [titel, status, cykel_id, bruger_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ updated: result.affectedRows });
    });
};

// Slet task
exports.delete = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM Opgave WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: result.affectedRows });
    });
};