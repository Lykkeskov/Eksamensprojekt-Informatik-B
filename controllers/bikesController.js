const bikeModel = require("../models/bikeModel");

module.exports = {

  // Opret cykel
  createBike: (req, res) => {
    bikeModel.createBike(req.body, (err) => {
      if (err) {
        console.error(err);
        return res.send("Fejl ved oprettelse");
      }
      res.send("Cykel oprettet!");
    });
  },

  // Hent alle cykler
  getAllBikes: (req, res) => {
    bikeModel.getAllBikes((err, bikes) => {
      if (err) {
        console.error(err);
        return res.send("Fejl ved hentning");
      }
      res.json(bikes);
    });
  }

};