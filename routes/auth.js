const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Show login page
router.get("/", (req, res) => {
    res.sendFile("login.html", { root: "./views" });
});

// Login logic
router.post("/login", authController.login);

// Dashboard
router.get("/dashboard", authController.dashboard);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
