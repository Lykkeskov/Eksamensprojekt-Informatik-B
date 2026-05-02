const db = require("../db");

// Show all bikes (from Reservation table)
exports.list = (req, res) => {
    db.query("SELECT code, name FROM Reservation", (err, rows) => {
        if (err) return res.status(500).send("Database error");

        let html = `
            <h1>Bike Inventory</h1>
            <a href="/dashboard">⬅ Back</a><br><br>

            <table border="1" cellpadding="10">
                <tr>
                    <th>Bike ID</th>
                    <th>Name</th>
                </tr>
        `;

        rows.forEach(r => {
            html += `
                <tr>
                    <td>${r.code}</td>
                    <td>${r.name}</td>
                </tr>
            `;
        });

        html += `</table>`;
        res.send(html);
    });
};
