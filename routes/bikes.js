const express = require("express");
const router = express.Router();
const bikesController = require("../controllers/bikesController");

<<<<<<< HEAD
// Create reservation
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);

// Search reservation
router.get("/bikes/search", bikesController.searchForm);
router.post("/bikes/search", bikesController.search);
=======
// HTML routes
router.get("/bikes", bikesController.list);
router.get("/bikes/new", bikesController.newForm);
router.post("/bikes/new", bikesController.create);

router.get("/api/bikes", bikesController.apiList);
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f

module.exports = router;
