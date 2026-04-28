const db = require("../database");

module.exports = {
    getAllTasks(callback) {
        const sql = "SELECT * FROM tasks";
        db.all(sql, [], callback);
    },

    createTask(data, callback) {
        const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)";
        db.run(sql, [data.title, data.description, data.status], callback);
    },

    getTaskById(id, callback) {
        const sql = "SELECT * FROM tasks WHERE id = ?";
        db.get(sql, [id], callback);
    },

    updateTask(id, data, callback) {
        const sql = "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?";
        db.run(sql, [data.title, data.description, data.status, id], callback);
    },

    deleteTask(id, callback) {
        const sql = "DELETE FROM tasks WHERE id = ?";
        db.run(sql, [id], callback);
    }
};
