const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
    })
);

// Routes
const authRoutes = require("./routes/auth");
const bikeRoutes = require("./routes/bikes");

app.use("/", authRoutes);
app.use("/", bikeRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
