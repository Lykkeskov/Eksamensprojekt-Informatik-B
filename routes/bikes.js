const express = require("express");
const router = express.Router();
const bikesController = require("../controllers/bikesController");

// Create reservation
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);
router.get("/bikes", bikesController.list);


// Search reservation
router.get("/bikes/search", bikesController.searchForm);
router.post("/bikes/search", bikesController.search);

module.exports = router;
