const db = require("../db");

/* -------------------- HTML: LIST + CREATE FORM -------------------- */

exports.htmlList = (req, res) => {
    db.query("SELECT * FROM opgave", (err, rows) => {
        if (err) return res.send("Fejl ved hentning af opgaver");

        let html = `
            <h1>Opgaver</h1>

            <h2>Opret ny opgave</h2>
            <form action="/tasks/new" method="POST">
                <label>Titel:</label><br>
                <input type="text" name="title" required><br><br>

                <label>Status:</label><br>
                <select name="status">
                    <option value="pending">Afventer</option>
                    <option value="in_progress">I gang</option>
                    <option value="done">Færdig</option>
                </select><br><br>

                <label>Cykel ID:</label><br>
                <input type="number" name="cykel_id" required><br><br>

                <label>Bruger ID (valgfri):</label><br>
                <input type="number" name="bruger_id"><br><br>

                <button type="submit">Opret opgave</button>
            </form>

            <hr>

            <h2>Eksisterende opgaver</h2>
            <table border="1" cellpadding="10">
                <tr>
                    <th>ID</th>
                    <th>Titel</th>
                    <th>Status</th>
                    <th>Cykel ID</th>
                    <th>Bruger ID</th>
                    <th>Handlinger</th>
                </tr>
        `;

        rows.forEach(t => {
            html += `
                <tr>
                    <td>${t.id}</td>
                    <td>${t.titel}</td>
                    <td>${t.status}</td>
                    <td>${t.cykel_id}</td>
                    <td>${t.bruger_id ?? "-"}</td>
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

/* -------------------- HTML: CREATE TASK -------------------- */

exports.htmlCreate = (req, res) => {
    const { title, status, cykel_id, bruger_id } = req.body;

    if (!title || title.trim().length < 2) {
        return res.send("Titel skal være mindst 2 tegn.");
    }

    const allowedStatuses = ["pending", "in_progress", "done"];
    if (!allowedStatuses.includes(status)) {
        return res.send("Ugyldig status.");
    }

    if (!cykel_id) {
        return res.send("Cykel ID er påkrævet.");
    }

    db.query(
        "INSERT INTO opgave (titel, status, cykel_id, bruger_id) VALUES (?, ?, ?, ?)",
        [title.trim(), status, cykel_id, bruger_id || null],
        (err) => {
            if (err) return res.send("Fejl ved oprettelse af opgave");
            res.redirect("/tasks");
        }
    );
};

/* -------------------- MARK TASK AS DONE -------------------- */

exports.markDone = (req, res) => {
    const id = req.params.id;

    db.query(
        "UPDATE opgave SET status = 'done' WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.send("Fejl ved opdatering af opgave");
            res.redirect("/tasks");
        }
    );
};

/* -------------------- DELETE TASK -------------------- */

exports.deleteHtml = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM opgave WHERE id = ?", [id], (err) => {
        if (err) return res.send("Fejl ved sletning af opgave");
        res.redirect("/tasks");
    });
};

/* -------------------- API: GET ALL TASKS -------------------- */

exports.list = (req, res) => {
    db.query("SELECT * FROM opgave", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

/* -------------------- API: GET ONE TASK -------------------- */

exports.getOne = (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM opgave WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
};

/* -------------------- API: CREATE TASK -------------------- */

exports.create = (req, res) => {
    const { title, status, cykel_id, bruger_id } = req.body;

    db.query(
        "INSERT INTO opgave (titel, status, cykel_id, bruger_id) VALUES (?, ?, ?, ?)",
        [title, status, cykel_id, bruger_id || null],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                id: result.insertId,
                title,
                status,
                cykel_id,
                bruger_id: bruger_id || null
            });
        }
    );
};

/* -------------------- API: UPDATE TASK -------------------- */

exports.update = (req, res) => {
    const id = req.params.id;
    const { title, status, cykel_id, bruger_id } = req.body;

    db.query(
        "UPDATE opgave SET titel = ?, status = ?, cykel_id = ?, bruger_id = ? WHERE id = ?",
        [title, status, cykel_id, bruger_id || null, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ updated: result.affectedRows });
        }
    );
};

/* -------------------- API: DELETE TASK -------------------- */

exports.delete = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM opgave WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: result.affectedRows });
    });
};
