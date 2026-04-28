const express = require("express");
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

app.use(authRoutes); 
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
});
