const bikeModel = require("../models/bikeModel");
<<<<<<< HEAD
=======
const path = require("path");
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f

// Generate random 8-digit code
function generateCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

module.exports = {

<<<<<<< HEAD
    newForm: (req, res) => {
        res.sendFile("newBike.html", { root: "./views" });
    },

=======
    // Show form to create a new reservation
    newForm: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/newBike.html"));
    },

    // Create reservation
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f
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

<<<<<<< HEAD
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
=======
    // List all reservations (HTML)
    list: (req, res) => {
        bikeModel.getAllBikes((err, bikes) => {
            if (err) return res.send("Error loading reservations");

            let html = `
                <h1>Alle reservationer</h1>
                <table border="1" cellpadding="10" cellspacing="0">
                    <tr>
                        <th>Navn</th>
                        <th>Telefon</th>
                        <th>Email</th>
                        <th>Beskrivelse</th>
                        <th>Kode</th>
                    </tr>
            `;

            bikes.forEach(bike => {
                html += `
                    <tr>
                        <td>${bike.name}</td>
                        <td>${bike.phone}</td>
                        <td>${bike.email}</td>
                        <td>${bike.description}</td>
                        <td>${bike.code}</td>
                    </tr>
                `;
            });

            html += `
                </table>
                <br>
                <a href="/dashboard">Tilbage</a>
            `;

            res.send(html);
        });
    },

    // API endpoint to list all reservations in JSON
    apiList: (req, res) => {
        bikeModel.getAllBikes((err, bikes) => {
            if (err) {
                return res.status(500).json({ error: "Databasefejl" });
            }
            res.json(bikes);
>>>>>>> 58044b3959d1dd3413c8f87ffbd91720bd863a1f
        });
    }
};
