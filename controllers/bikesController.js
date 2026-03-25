const bikeModel = require("../models/bikeModel");

// Generate random 8-digit code
function generateCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

module.exports = {

    newForm: (req, res) => {
        res.sendFile("newBike.html", { root: "./views" });
    },

    create: (req, res) => {
        const code = generateCode();

        const data = {
            code,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            description: req.body.description
        };

        bikeModel.createBike(data, (err) => {
            if (err) return res.send("Error saving reservation");

            res.send(`
                <h1>Reservation Created!</h1>
                <p>Your reservation code is: <strong>${code}</strong></p>
                <a href="/dashboard">Back to Dashboard</a>
            `);
        });
    },

    searchForm: (req, res) => {
        res.sendFile("searchBike.html", { root: "./views" });
    },

    search: (req, res) => {
        const code = req.body.code;

        bikeModel.getBikeByCode(code, (err, bike) => {
            if (!bike) return res.send("No reservation found");

            res.send(`
                <h1>Reservation Details</h1>
                <p><strong>Code:</strong> ${bike.code}</p>
                <p><strong>Name:</strong> ${bike.name}</p>
                <p><strong>Phone:</strong> ${bike.phone}</p>
                <p><strong>Email:</strong> ${bike.email}</p>
                <p><strong>Description:</strong> ${bike.description}</p>
                <a href="/dashboard">Back</a>
            `);
        });
    }
};
