const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

// Tjek hvilke funktioner der findes i controlleren
console.log("TasksController:", tasksController);

// Brug kun funktioner der findes
if (tasksController.list) {
    router.get("/tasks", tasksController.list);
}

if (tasksController.getOne) {
    router.get("/tasks/:id", tasksController.getOne);
}

if (tasksController.getByBike) {
    router.get("/tasks/bike/:bikeId", tasksController.getByBike);
}

if (tasksController.create) {
    router.post("/tasks", tasksController.create);
}

if (tasksController.update) {
    router.put("/tasks/:id", tasksController.update);
}

if (tasksController.delete) {
    router.delete("/tasks/:id", tasksController.delete);
}

module.exports = router;
