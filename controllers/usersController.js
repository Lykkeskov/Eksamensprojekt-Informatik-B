const db = require("../database");

// Hent alle brugere
exports.list = (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Hent én bruger
exports.getOne = (req, res) => {
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Opret bruger
exports.create = (req, res) => {
    const { username, password, role } = req.body;

    db.run(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [username, password, role],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                username,
                role
            });
        }
    );
};

// Opdater bruger
exports.update = (req, res) => {
    const id = req.params.id;
    const { username, password, role } = req.body;

    db.run(
        "UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?",
        [username, password, role, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

// Slet bruger
exports.delete = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};
