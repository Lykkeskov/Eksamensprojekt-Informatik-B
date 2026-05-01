const db = require("../db");

// -----------------------------
// API CONTROLLER FUNCTIONS
// -----------------------------

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

// Opret task (API)
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

// Opdater task (API)
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

// Slet task (API)
exports.delete = (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM Opgave WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: result.affectedRows });
    });
};

// -----------------------------
// HTML CONTROLLER FUNCTIONS
// -----------------------------

// HTML: List all tasks
exports.htmlList = (req, res) => {
    const sql = `
        SELECT Opgave.*, Cykel.type AS cykel_type, Bruger.navn AS bruger_navn
        FROM Opgave
        LEFT JOIN Cykel ON Opgave.cykel_id = Cykel.id
        LEFT JOIN Bruger ON Opgave.bruger_id = Bruger.id
    `;

    db.query(sql, (err, rows) => {
        if (err) return res.send("Fejl ved hentning af opgaver");
        res.render("tasks/list", { tasks: rows });
    });
};

// HTML: Create a new task
exports.htmlCreate = (req, res) => {
    const { titel, status, cykel_id, bruger_id } = req.body;

    const sql = `
        INSERT INTO Opgave (titel, status, cykel_id, bruger_id)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [titel, status, cykel_id, bruger_id], (err) => {
        if (err) return res.send("Fejl ved oprettelse af opgave");
        res.redirect("/tasks");
    });
};

// HTML: Mark task as done
exports.markDone = (req, res) => {
    const sql = `
        UPDATE Opgave
        SET status = 'done'
        WHERE id = ?
    `;

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.send("Fejl ved opdatering");
        res.redirect("/tasks");
    });
};

// HTML: Delete task
exports.deleteHtml = (req, res) => {
    const sql = "DELETE FROM Opgave WHERE id = ?";

    db.query(sql, [req.params.id], (err) => {
        if (err) return res.send("Fejl ved sletning");
        res.redirect("/tasks");
    });
};
