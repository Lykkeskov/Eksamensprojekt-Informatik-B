const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const path = require("path");

module.exports = {

    // Handle login POST
    login: (req, res) => {
        const { username, password } = req.body;

        userModel.getUser(username, (err, user) => {
            if (err) {
                console.error("Database error:", err);
                return res.send("Database error");
            }

            if (!user) {
                return res.send("User not found");
            }

            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error("Password compare error:", err);
                    return res.send("Error checking password");
                }

                if (match) {
                    req.session.user = user;
                    return res.redirect("/dashboard");
                } else {
                    return res.send("Wrong password");
                }
            });
        });
    },

    // Serve dashboard page
    dashboard: (req, res) => {
        if (!req.session.user) {
            return res.redirect("/");
        }

        res.sendFile(path.join(__dirname, "../views/dashboard.html"));
    },

    // Logout
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
};
