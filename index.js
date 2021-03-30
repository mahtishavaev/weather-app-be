const express = require("express");
const placeRouter = require("./routes/places");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/places", placeRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, () => console.log(`[server]: Server is running at http://localhost:${PORT}`));
