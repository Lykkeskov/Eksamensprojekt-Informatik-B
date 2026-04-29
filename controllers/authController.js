const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const path = require("path");

module.exports = {

    // LOGIN
    login: (req, res) => {
        const { navn, password } = req.body;

        if (!navn || !password) {
            return res.send("Manglende login oplysninger");
        }

        userModel.getUserByName(navn, (err, user) => {
            if (err) {
                console.error("Database error:", err);
                return res.send("Database fejl");
            }

            if (!user) {
                return res.send("Bruger findes ikke");
            }

            bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                    console.error("Password error:", err);
                    return res.send("Fejl ved login");
                }

                if (!match) {
                    return res.send("Forkert kodeord");
                }

                // Opbehaver kun sikre data i session
                req.session.user = {
                    id: user.id,
                    navn: user.navn,
                    rolle: user.rolle
                };

                res.redirect("/dashboard");
            });
        });
    },

    // DASHBOARD
    dashboard: (req, res) => {
        if (!req.session.user) {
            return res.redirect("/");
        }

        res.sendFile(path.join(__dirname, "../views/dashboard.html"));
    },

    // LOGOUT
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect("/");
        });
    }
};