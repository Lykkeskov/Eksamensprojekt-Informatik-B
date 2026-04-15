const bikeModel = require("../models/bikeModel");
const path = require("path");

// Generate random 8-digit code
function generateCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

module.exports = {

    // Show form to create a new reservation
    newForm: (req, res) => {
        res.sendFile(path.resolve(__dirname, "../views/newBike.html"));
    },

    // Create reservation
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

    // ⭐ NEW: API endpoint – return all bikes as JSON
    apiList: (req, res) => {
        bikeModel.getAllBikes((err, bikes) => {
            if (err) {
                return res.status(500).json({ error: "Databasefejl" });
            }
            res.json(bikes);
        });
    }
};
