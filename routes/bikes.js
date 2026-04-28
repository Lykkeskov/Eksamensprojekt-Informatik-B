const express = require("express");
const router = express.Router();
const bikesController = require("../controllers/bikesController");

// Hent alle cykler
router.get("/bikes", bikesController.getAllBikes);

// Opret cykel
router.post("/bikes", bikesController.createBike);

module.exports = router;

/*
const express = require("express");
const router = express.Router();
const bikesController = require("../controllers/bikesController");


// Create reservation
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);

// Search reservation
router.get("/bikes/search", bikesController.searchForm);
router.post("/bikes/search", bikesController.search);

// HTML routes
router.get("/bikes", bikesController.list);
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);

// API route (skal ligge før module.exports)
router.get("/api/bikes", bikesController.apiList);

module.exports = router;

 */
