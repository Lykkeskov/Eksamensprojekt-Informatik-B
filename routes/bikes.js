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

// API route
router.get("/api/bikes", bikesController.apiList);

module.exports = router;
