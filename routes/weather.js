const router = require("express").Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  const url = process.env.WEATHER_API_URL;
  const apiKey = process.env.WEATHER_API_KEY;
  try {
    const { status, data } = await axios.get(url, { params: { ...req.query, appid: apiKey } });
    res.status(status).json(data);
  } catch ({ response }) {
    res.status(response.status).json(response.data);
  }
});

module.exports = router;
