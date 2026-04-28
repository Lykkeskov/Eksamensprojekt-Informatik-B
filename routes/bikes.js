const express = require("express");
const router = express.Router();
const bikesController = require("../controllers/bikesController");

// HTML routes
router.get("/bikes", bikesController.list);
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);

// Search reservation
router.get("/bikes/search", bikesController.searchForm);
router.post("/bikes/search", bikesController.search);

// Delete reservation
router.post("/bikes/:id/delete", bikesController.delete);

// API route
router.get("/api/bikes", bikesController.apiList);

module.exports = router;
