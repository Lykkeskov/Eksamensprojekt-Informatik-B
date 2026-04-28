const db = require("../database");

// HTML: List + Create form
exports.htmlList = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.send("Fejl ved hentning af tasks");

        let html = `
            <h1>Opgaver</h1>

            <h2>Opret ny opgave</h2>
            <form action="/tasks/new" method="POST">
                <label>Titel:</label><br>
                <input type="text" name="title" required><br><br>

                <label>Beskrivelse:</label><br>
                <textarea name="description" required></textarea><br><br>

                <label>Status:</label><br>
                <select name="status">
                    <option value="pending">Afventer</option>
                    <option value="in_progress">I gang</option>
                    <option value="done">Færdig</option>
                </select><br><br>

                <button type="submit">Opret opgave</button>
            </form>

            <hr>

            <h2>Eksisterende opgaver</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <th>ID</th>
                    <th>Titel</th>
                    <th>Beskrivelse</th>
                    <th>Status</th>
                    <th>Handlinger</th>
                </tr>
        `;

        rows.forEach(t => {
            html += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.title}</td>
                    <td>${t.description}</td>
                    <td>${t.status}</td>
                    <td>
                        <form action="/tasks/${t.id}/done" method="POST" style="display:inline;">
                            <button type="submit">Færdig</button>
                        </form>

                        <form action="/tasks/${t.id}/delete" method="POST" style="display:inline;">
                            <button type="submit" style="background:red;color:white;">Slet</button>
                        </form>
                    </td>
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

// HTML: Create task
exports.htmlCreate = (req, res) => {
    const { title, description, status } = req.body;

    db.run(
        "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
        [title, description, status || "pending"],
        function (err) {
            if (err) return res.send("Fejl ved oprettelse af opgave");

            res.redirect("/tasks");
        }
    );
};

// HTML: Mark task as done
exports.markDone = (req, res) => {
    const id = req.params.id;

    db.run(
        "UPDATE tasks SET status = 'done' WHERE id = ?",
        [id],
        function (err) {
            if (err) return res.send("Fejl ved opdatering af opgave");
            res.redirect("/tasks");
        }
    );
};

// HTML: Delete task
exports.deleteHtml = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) return res.send("Fejl ved sletning af opgave");
        res.redirect("/tasks");
    });
};

// API: Get all tasks
exports.list = (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

// API: Get one task
exports.getOne = (req, res) => {
    const id = req.params.id;

    db.get("SELECT * FROM tasks WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

// API: Create task
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

// API: Update task
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

// API: Delete task
exports.delete = (req, res) => {
    const id = req.params.id;

    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: this.changes });
    });
};
