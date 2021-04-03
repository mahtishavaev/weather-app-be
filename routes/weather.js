const router = require("express").Router();
const axios = require("axios");
const Place = require("../models/Place");

router.get("/", async (req, res, next) => {
  const url = process.env.WEATHER_API_URL;
  const apiKey = process.env.WEATHER_API_KEY;
  const locationId = req.query.id;
  let lat, lon, locationName;

  if (!locationId) {
    return res.status(400).json({ error: "City id is required" });
  }

  try {
    const location = await Place.findOne({ geoname_id: locationId }).exec();
    lat = location.latitude;
    lon = location.longitude;
    locationName = location.name;
  } catch (error) {
    return res.status(404).json({ error: "Location not found" });
  }

  try {
    const queryParams = { lat, lon, units: "metric", exclude: "hourly,minutely", appid: apiKey };
    const { status, data } = await axios.get(url, { params: queryParams });
    res.status(status).json({ ...data, location_name: locationName });
  } catch ({ response }) {
    res.status(response.status).json(response.data);
  }
});

module.exports = router;
