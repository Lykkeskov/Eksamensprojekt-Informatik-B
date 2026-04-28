const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // For HTML forms
app.use(express.json()); // For API JSON

// Session setup
app.use(
    session({
        secret: "password123",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
const bikesRoutes = require("./routes/bikes");
const tasksRoutes = require("./routes/tasks");
const inventoryRoutes = require("./routes/inventory");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(authRoutes);
app.use(bikesRoutes);
app.use(tasksRoutes);
app.use(inventoryRoutes);
app.use(usersRoutes);

// Test API
app.get("/api/test", (req, res) => {
    res.json({ message: "API virker!" });
});

// Start server
app.listen(PORT, () => {
    console.log("Server kører på port " + PORT);
});
