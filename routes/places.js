const router = require("express").Router();
const Place = require("../models/Place");

router.get("/", async (req, res, next) => {
  if (!req.query.name) {
    return res.status(400).json({ error: "Name is required" });
  }

  try {
    const place = await Place.find({
      $or: [
        { name: { $regex: req.query.name, $options: "i" } },
        { names: { $regex: req.query.name, $options: "i" } },
      ],
    });

    const response = place
      .sort((a, b) => b.population - a.population)
      .slice(0, 10)
      .map(({ name, country, geoname_id, longitude, latitude, population }) => ({
        name,
        country,
        geoname_id,
        longitude,
        latitude,
        population,
      }));

    res.json(response);
  } catch (err) {
    next(err);
  }
});

// (async (req, res) => {
//   await Place.deleteMany({});
//   console.log("dropped");
// })();

module.exports = router;
