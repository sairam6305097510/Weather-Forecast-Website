import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(null);

  const getWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?lat=${lat}&lon=${lon}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const handleSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        alert("Location access denied.");
      }
    );
  };

  useEffect(() => {
    if (coords) {
      getWeather(coords.lat, coords.lon);
    }
  }, [coords]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather Forecast</h1>
      <input
        placeholder="Or click auto-detect"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Auto Detect</button>

      {weatherData ? (
        <div>
          <h2>{weatherData.city.name}</h2>
          {weatherData.list.slice(0, 5).map((item, index) => (
            <div key={index}>
              <p>{item.dt_txt}</p>
              <p>Temp: {item.main.temp}°C</p>
              <p>{item.weather[0].description}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>Enter a location or click auto-detect</p>
      )}
    </div>
  );
}

export default App;