import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Forecast from './components/Forecast';

function App() {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          fetchForecastByCoords(lat, lon);
        },
        () => setError('Location access denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  }, []);

  const fetchForecastByCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await res.json();
      setForecast(filterDailyForecast(data.list));
      setLocation(data.city.name);
    } catch {
      setError('Failed to fetch forecast');
    }
  };

  const fetchForecastByCity = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const data = await res.json();
      setForecast(filterDailyForecast(data.list));
      setLocation(data.city.name);
    } catch {
      setError('City not found');
    }
  };

  const filterDailyForecast = (data) => {
    return data.filter((_, i) => i % 8 === 0);
  };

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <Search onSearch={fetchForecastByCity} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forecast.length > 0 && <Forecast data={forecast} city={location} />}
    </div>
  );
}

export default App;
