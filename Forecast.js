import React from 'react';

function Forecast({ data, city }) {
  return (
    <div>
      <h2>5-Day Forecast for {city}</h2>
      <div className="forecast-container">
        {data.map((day, index) => (
          <div key={index} className="forecast-card">
            <p>{new Date(day.dt_txt).toDateString()}</p>
            <p>{day.weather[0].main}</p>
            <p>Temp: {day.main.temp} °C</p>
            <p>Humidity: {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
