const db = require("../database"); // hvis du bruger SQLite – ellers tilpas

// Hent alle tasks
exports.list = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Hent én task
exports.getOne = (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Hent tasks for en bestemt cykel
exports.getByBike = (req, res) => {
    const bikeId = req.params.bikeId;
    db.all("SELECT * FROM tasks WHERE bikeId = ?", [bikeId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Opret task
exports.create = (req, res) => {
    const { bikeId, title, status, mechanic, price } = req.body;

    db.run(
        "INSERT INTO tasks (bikeId, title, status, mechanic, price) VALUES (?, ?, ?, ?, ?)",
        [bikeId, title, status, mechanic, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                bikeId,
                title,
                status,
                mechanic,
                price
            });
        }
    );
};

// Opdater task
exports.update = (req, res) => {
    const id = req.params.id;
    const { title, status, mechanic, price } = req.body;

    db.run(
        "UPDATE tasks SET title = ?, status = ?, mechanic = ?, price = ? WHERE id = ?",
        [title, status, mechanic, price, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ updated: this.changes });
        }
    );
};

// Slet task
exports.delete = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: this.changes });
    });
};
