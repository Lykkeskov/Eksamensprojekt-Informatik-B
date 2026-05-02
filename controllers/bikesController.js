const bikeModel = require("../models/bikeModel");
const db = require("../db");
const path = require("path");

// Generate random 8-digit code
function generateCode() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

/* -------------------- LIST ALL -------------------- */

module.exports.listBikes = (req, res) => {
    bikeModel.getAllReservations((err, reservations) => {
        if (err) return res.send("Error loading reservations");

        let html = `
            <h1>All Reservations123455</h1>
            <a href="/dashboard">⬅ Back</a><br><br>
            <a href="/bikes/new">New Reservation</a><br><br>

            <table border="1" cellpadding="10">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Description</th>
                    <th>Code</th>
                    <th>Actions</th>
                </tr>
        `;

        reservations.forEach(r => {
            html += `
                <tr>
                    <td>${r.name}</td>
                    <td>${r.email}</td>
                    <td>${r.phone}</td>
                    <td>${r.description}</td>
                    <td>${r.code}</td>
                    <td>
                        <form action="/bikes/${r.id}/delete" method="POST">
                            <button style="background:red;color:white;">Delete</button>
                        </form>
                    </td>
                </tr>
            `;
        });

        html += `</table>`;
        res.send(html);
    });
};

/* -------------------- CREATE FORM -------------------- */

module.exports.newBikeForm = (req, res) => {
    res.sendFile(path.join(__dirname, "../views/newBike.html"));
};

/* -------------------- CREATE -------------------- */

module.exports.createBike = (req, res) => {
    const code = generateCode();
    const { name, email, phone, description } = req.body;

    if (!name || name.length < 2) return res.send("Name too short");
    if (!email || !email.includes("@")) return res.send("Invalid email");
    if (!phone || !/^[0-9+\-\s]{6,15}$/.test(phone)) return res.send("Invalid phone");
    if (!description || description.length < 5) return res.send("Description too short");

    // 1. Create reservation
    bikeModel.createReservation({ code, name, email, phone, description }, (err) => {
        if (err) return res.send("Error saving reservation");

        // 2. Automatically create a bike using the reservation code as the bike ID
        db.query(
            "INSERT INTO cykel (id, type, status, beskrivelse) VALUES (?, ?, ?, ?)",
            [code, "Reserved", "pending", "Created from reservation"],
            (err) => {
                if (err) console.log("Fejl ved oprettelse af cykel:", err);
            }
        );

        // 3. Show success page
        res.send(`
            <h1>Reservation Created!</h1>
            <p>Your reservation code is <strong>${code}</strong></p>
            <a href="/bikes">Back</a>
        `);
    });
};


/* -------------------- DELETE -------------------- */

module.exports.deleteBike = (req, res) => {
    bikeModel.deleteReservation(req.params.id, (err) => {
        if (err) return res.send("Error deleting reservation");
        res.redirect("/bikes");
    });
};

module.exports.searchReservationByCode = (req, res) => {
    const code = req.body.code;

    bikeModel.getReservationByCode(code, (err, reservation) => {
        if (err) return res.send("Database error");
        if (!reservation) return res.send("No reservation found");

        res.send(`
            <h1>Reservation Details</h1>
            <p><strong>Code:</strong> ${reservation.code}</p>
            <p><strong>Name:</strong> ${reservation.name}</p>
            <p><strong>Email:</strong> ${reservation.email}</p>
            <p><strong>Phone:</strong> ${reservation.phone}</p>
            <p><strong>Description:</strong> ${reservation.description}</p>
            <a href="/bikes">Back</a>
        `);
    });
};
