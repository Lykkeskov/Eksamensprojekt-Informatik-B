const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const path = require("path");

// Show login page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

// Login logic
router.post("/login", authController.login);

// Dashboard
router.get("/dashboard", authController.dashboard);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
