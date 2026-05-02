const express = require("express");
const router = express.Router();
const controller = require("../controllers/bikesController");
const path = require("path");

// List all reservations
router.get("/", controller.listBikes);

// Show create form
router.get("/new", controller.newBikeForm);

// Create reservation
router.post("/new", controller.createBike);

// Delete reservation
router.post("/:id/delete", controller.deleteBike);

// Show search form
router.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/searchBike.html"));
});

// Handle search
router.post("/search", controller.searchReservationByCode);

module.exports = router;
