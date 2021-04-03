const router = require("express").Router();
const Place = require("../models/Place");

router.get("/", async (req, res, next) => {
  if (!req.query.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const name = req.query.name.trim();
  try {
    const place = await Place.find(
      {
        $or: [
          { name: { $regex: name, $options: "i" } },
          { names: { $regex: name, $options: "i" } },
        ],
      },
      null,
      {
        skip: 0,
        limit: 5,
        sort: {
          population: -1,
        },
      }
    );
    const response = place.map(({ name, country, geoname_id, longitude, latitude }) => ({
      name,
      country,
      geoname_id,
      longitude,
      latitude,
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
