const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Skal bruges til JSON POST
app.use(express.static(path.join(__dirname, "public")));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);

// Auth middleware
function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.rolle !== "admin") {
    return res.send("Ingen adgang (kun admin)");
  }
  next();
}

// Routes
const authRoutes = require("./routes/auth");
const bikeRoutes = require("./routes/bikes");
const tasksRoutes = require("./routes/tasks");
const inventoryRoutes = require("./routes/inventory");
const usersRoutes = require("./routes/users");

// Offentlige routes (log ind først)
app.use("/", authRoutes);

// Beskyttede routes
app.use("/bikes", requireLogin, bikeRoutes);
app.use("/tasks", requireLogin, tasksRoutes);
app.use("/inventory", requireLogin, inventoryRoutes);
app.use("/users", requireLogin, usersRoutes);

// Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API virker!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server kører på http://localhost:" + PORT);
});