const express = require("express");
const router = express.Router();
const controller = require("../controllers/bikesController");

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
    res.send(`
        <h1>Search Reservation</h1>
        <form action="/bikes/search" method="POST">
            <label>Reservation Code:</label><br>
            <input name="code"><br><br>
            <button type="submit">Search</button>
        </form>
    `);
});

// Handle search
router.post("/search", controller.searchReservationByCode);

module.exports = router;
