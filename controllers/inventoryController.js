const db = require("../database");

// Hent alle dele
exports.list = (req, res) => {
    db.all("SELECT * FROM inventory", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Opret ny del
exports.create = (req, res) => {
    const { name, quantity, price } = req.body;

    db.run(
        "INSERT INTO inventory (name, quantity, price) VALUES (?, ?, ?)",
        [name, quantity, price],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                name,
                quantity,
                price
            });
        }
    );
};

// Opdater del
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, quantity, price } = req.body;

    db.run(
        "UPDATE inventory SET name = ?, quantity = ?, price = ? WHERE id = ?",
        [name, quantity, price, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ updated: this.changes });
        }
    );
};

// Slet del
exports.delete = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM inventory WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
};
