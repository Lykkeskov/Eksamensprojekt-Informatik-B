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

    // Create reservation (with input validation)
    create: (req, res) => {
        const code = generateCode();

        const { name, phone, email, description } = req.body;

        // Input validation
        if (!name || name.trim().length < 2) {
            return res.send("Navn skal være mindst 2 tegn.");
        }

        if (!phone || !/^[0-9+\-\s]{6,15}$/.test(phone)) {
            return res.send("Telefonnummer er ugyldigt.");
        }

        if (!email || !email.includes("@") || email.length < 5) {
            return res.send("Email er ugyldig.");
        }

        if (!description || description.trim().length < 5) {
            return res.send("Beskrivelse skal være mindst 5 tegn.");
        }

        const data = {
            code,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            description: description.trim()
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
        res.sendFile(path.resolve(__dirname, "../views/searchBike.html"));
    },

    // Search reservation by code
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
                        <th>Handlinger</th>
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
                        <td>
                            <form action="/bikes/${bike.id}/delete" method="POST" style="display:inline;">
                                <button type="submit" style="background:red;color:white;">Slet</button>
                            </form>
                        </td>
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

    // Delete reservation
    delete: (req, res) => {
        const id = req.params.id;

        bikeModel.deleteBike(id, (err) => {
            if (err) return res.send("Fejl ved sletning af reservation");
            res.redirect("/bikes");
        });
    },

    // API endpoint to list all reservations in JSON
    apiList: (req, res) => {
        bikeModel.getAllBikes((err, bikes) => {
            if (err) {
                return res.status(500).json({ error: "Databasefejl" });
            }
            res.json(bikes);
        });
    }
};
