const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Hent alle dele
router.get("/inventory", inventoryController.list);

// Opret ny del
router.post("/inventory", inventoryController.create);

// Opdater del
router.put("/inventory/:id", inventoryController.update);

// Slet del
router.delete("/inventory/:id", inventoryController.delete);

module.exports = router;
