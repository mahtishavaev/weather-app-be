const express = require("express");
const placeRouter = require("./routes/places");
const weatherRouter = require("./routes/weather");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use("/places", placeRouter);
app.use("/weather", weatherRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

const port = process.env.PORT;

app.listen(port, () => console.log(`[server]: Server is running on port: ${port}`));
