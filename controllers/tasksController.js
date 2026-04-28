const db = require("../database");

// Vis alle tasks i tabel
exports.htmlList = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.send("Fejl ved hentning af tasks");

        let html = `
            <h1>Opgaver</h1>

           

            <table border="1" cellpadding="10">
                <tr>
                    <th>ID</th>
                    <th>Titel</th>
                    <th>Beskrivelse</th>
                    <th>Status</th>
                </tr>
        `;

        rows.forEach(t => {
            html += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.title}</td>
                    <td>${t.description}</td>
                    <td>${t.status}</td>
                </tr>
            `;
        });

        html += `
            </table>
            <br>
            <a href="/dashboard">Tilbage</a>
        `;

        res.send(html);
    });
};

// Hent alle tasks
exports.list = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// Hent en task
exports.getOne = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// Opret task
exports.create = (req, res) => {
    const { title, description, status } = req.body;

    db.run(
        "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
        [title, description, status || "pending"],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: this.lastID,
                title,
                description,
                status: status || "pending"
            });
        }
    );
};

// Opdater task
exports.update = (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;

    db.run(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, id],
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
