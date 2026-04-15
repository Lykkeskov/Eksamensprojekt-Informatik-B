const express = require("express");
<<<<<<< HEAD
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
=======
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const session = require("express-session");
app.use(session({
    secret: "password123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, "public")));

const bikesRoutes = require("./routes/bikes");
const tasksRoutes = require("./routes/tasks");
const inventoryRoutes = require("./routes/inventory");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(authRoutes);       // LOGIN SKAL KOMME FØRST
app.use(bikesRoutes);
app.use(tasksRoutes);
app.use(inventoryRoutes);
app.use(usersRoutes);

app.get("/api/test", (req, res) => {
    res.json({ message: "API virker!" });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server kører på port " + PORT);
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f
});
