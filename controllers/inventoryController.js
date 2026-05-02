const db = require("../db");

// LIST INVENTORY (bikes + spare parts)
exports.list = (req, res) => {
    // First query: bikes from Reservation
    db.query("SELECT code, name FROM Reservation", (err, bikes) => {
        if (err) return res.status(500).send("Database error (bikes)");

        // Second query: spare parts from Reservedele
        db.query("SELECT id, navn, antal FROM Reservedele", (err2, parts) => {
            if (err2) return res.status(500).send("Database error (parts)");

            let html = `
                <h1>Inventory</h1>
                <a href="/dashboard">⬅ Tilbage</a><br><br>

                <h2>Cykler (fra reservationer)</h2>
                <table border="1" cellpadding="10">
                    <tr>
                        <th>Bike ID</th>
                        <th>Name</th>
                    </tr>
            `;

            bikes.forEach(b => {
                html += `
                    <tr>
                        <td>${b.code}</td>
                        <td>${b.name}</td>
                    </tr>
                `;
            });

            html += `
                </table>
                <br><br>

                <h2>Reservedele (Spare Parts)</h2>

                <form action="/inventory/add" method="POST">
                    <input type="text" name="navn" placeholder="Navn på reservedel" required>
                    <input type="number" name="antal" placeholder="Antal" required>
                    <button type="submit">Tilføj reservedel</button>
                </form>

                <br>

                <table border="1" cellpadding="10">
                    <tr>
                        <th>Navn</th>
                        <th>Antal</th>
                        <th>Handling</th>
                    </tr>
            `;

            parts.forEach(p => {
                html += `
                    <tr>
                        <td>${p.navn}</td>
                        <td>${p.antal}</td>
                        <td>
                            <form action="/inventory/delete/${p.id}" method="POST" style="display:inline;">
                                <button type="submit">Slet</button>
                            </form>
                        </td>
                    </tr>
                `;
            });

            html += `
                </table>
            `;

            res.send(html);
        });
    });
};

// ADD OR UPDATE SPARE PART (ALLOW NEGATIVE INPUT BUT PREVENT NEGATIVE FINAL STOCK + MERGE DUPLICATES)
exports.addPart = (req, res) => {
    const { navn, antal } = req.body;

    if (!navn || !antal) {
        return res.send("Fejl: Du skal udfylde alle felter.");
    }

    const antalInt = parseInt(antal);

    // Find ALL parts with same name (to merge duplicates)
    db.query(
        "SELECT id, antal FROM Reservedele WHERE navn = ?",
        [navn],
        (err, rows) => {
            if (err) return res.status(500).send("Database error (check part)");

            // If NO rows exist → insert new part
            if (rows.length === 0) {

                // Prevent inserting negative stock
                if (antalInt < 0) {
                    return res.send("Fejl: Lagerbeholdning kan ikke blive negativ.");
                }

                db.query(
                    "INSERT INTO Reservedele (navn, antal) VALUES (?, ?)",
                    [navn, antalInt],
                    (err2) => {
                        if (err2) return res.status(500).send("Database error (insert part)");
                        res.redirect("/inventory");
                    }
                );
                return;
            }

            // Merge duplicates: sum all quantities
            let totalAmount = antalInt;
            rows.forEach(r => {
                totalAmount += r.antal;
            });

            // Prevent negative final stock
            if (totalAmount < 0) {
                return res.send("Fejl: Lagerbeholdning kan ikke blive negativ.");
            }

            const mainId = rows[0].id; // Keep the first row as the main one

            // Update main row
            db.query(
                "UPDATE Reservedele SET antal = ? WHERE id = ?",
                [totalAmount, mainId],
                (err3) => {
                    if (err3) return res.status(500).send("Database error (update part)");

                    // Delete all other duplicates
                    const duplicateIds = rows.slice(1).map(r => r.id);

                    if (duplicateIds.length > 0) {
                        db.query(
                            "DELETE FROM Reservedele WHERE id IN (?)",
                            [duplicateIds],
                            () => res.redirect("/inventory")
                        );
                    } else {
                        res.redirect("/inventory");
                    }
                }
            );
        }
    );
};

// DELETE SPARE PART
exports.deletePart = (req, res) => {
    const id = req.params.id;

    db.query(
        "DELETE FROM Reservedele WHERE id = ?",
        [id],
        (err) => {
            if (err) return res.status(500).send("Database error (delete part)");
            res.redirect("/inventory");
        }
    );
};
