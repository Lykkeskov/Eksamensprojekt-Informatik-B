const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// HTML route
router.get("/tasks", tasksController.htmlList);

router.get("/tasks/new", (req, res) => {
    res.send(`
        <h1>Opret ny opgave</h1>
        <form action="/tasks/new" method="POST">
            <label>Titel:</label><br>
            <input type="text" name="title" required><br><br>

            <label>Beskrivelse:</label><br>
            <textarea name="description"></textarea><br><br>

            <label>Status:</label><br>
            <select name="status">
                <option value="pending">Afventer</option>
                <option value="in_progress">I gang</option>
                <option value="done">Færdig</option>
            </select><br><br>

            <button type="submit">Opret opgave</button>
        </form>

        <br><a href="/tasks">Tilbage</a>
    `);
});

router.post("/tasks/new", (req, res) => {
    const { title, description, status } = req.body;

    const db = require("../database");
    db.run(
        "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)",
        [title, description, status],
        function (err) {
            if (err) return res.send("Fejl ved oprettelse af opgave");
            res.redirect("/tasks");
        }
    );
});

// API routes
router.get("/api/tasks", tasksController.list);
router.get("/api/tasks/:id", tasksController.getOne);
router.post("/api/tasks", tasksController.create);
router.put("/api/tasks/:id", tasksController.update);
router.delete("/api/tasks/:id", tasksController.delete);

module.exports = router;
