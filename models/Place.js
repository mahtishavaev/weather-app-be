const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: String,
  names: String,
  country: String,
  geoname_id: String,
  longitude: String,
  latitude: String,
  population: String,
});

module.exports = mongoose.model("Place", PlaceSchema);
