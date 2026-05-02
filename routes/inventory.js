const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Show bike IDs + names
router.get("/", inventoryController.list);

module.exports = router;
