const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).send("Error fetching weather data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});