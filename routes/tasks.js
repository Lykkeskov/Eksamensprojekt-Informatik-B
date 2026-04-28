const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// HTML routes
router.get("/tasks", tasksController.htmlList);
router.post("/tasks/new", tasksController.htmlCreate);
router.post("/tasks/:id/done", tasksController.markDone);
router.post("/tasks/:id/delete", tasksController.deleteHtml);

// API routes
router.get("/api/tasks", tasksController.list);
router.get("/api/tasks/:id", tasksController.getOne);
router.post("/api/tasks", tasksController.create);
router.put("/api/tasks/:id", tasksController.update);
router.delete("/api/tasks/:id", tasksController.delete);

module.exports = router;
