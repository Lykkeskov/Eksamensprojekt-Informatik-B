const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session setup
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
    return res.redirect("/login");
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.send("Ingen adgang (kun admin)");
  }
  next();
}

// ROUTES
const authRoutes = require("./routes/auth");
const bikeRoutes = require("./routes/bikes");
const tasksRoutes = require("./routes/tasks");
const inventoryRoutes = require("./routes/inventory");
const usersRoutes = require("./routes/users");

// Public routes
app.use("/", authRoutes);

// Protected routes
app.use("/bikes", requireLogin, bikeRoutes);

// ⭐ FIXED: Tasks route added properly
app.use("/", requireLogin, tasksRoutes);

app.use("/inventory", requireLogin, inventoryRoutes);
app.use("/users", requireAdmin, usersRoutes);

// Dashboard (HTML)
app.get("/dashboard", requireLogin, (req, res) => {
  res.send(`
    <h1>Dashboard</h1>
    <p>Velkommen, ${req.session.user.username}</p>

    <ul>
      <li><a href="/bikes">Håndter Cykler</a></li>
      <li><a href="/tasks">Håndter Opgaver</a></li>
      <li><a href="/inventory">Håndter Lager</a></li>
      <li><a href="/users">Håndter Brugere</a></li>
    </ul>

    <form action="/logout" method="POST">
      <button type="submit">Log ud</button>
    </form>
  `);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server kører på http://localhost:" + PORT);
});
