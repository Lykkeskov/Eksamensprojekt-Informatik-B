const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.list);
router.post("/add", inventoryController.addPart);
router.post("/delete/:id", inventoryController.deletePart);

module.exports = router;
