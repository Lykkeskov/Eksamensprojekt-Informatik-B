const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Hent alle brugere
router.get("/users", usersController.list);

// Hent én bruger
router.get("/users/:id", usersController.getOne);

// Opret bruger
router.post("/users", usersController.create);

// Opdater bruger
router.put("/users/:id", usersController.update);

// Slet bruger
router.delete("/users/:id", usersController.delete);

module.exports = router;
