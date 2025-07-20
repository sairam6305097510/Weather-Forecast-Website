# Weather Forecast Website

This project is a simple weather forecast web application built with ReactJS for the frontend and Node.js for the backend. It uses the OpenWeatherMap API to fetch real-time 5-day weather data based on the user's current location.

## Features
- Auto-detects user's current location using browser geolocation
- Displays weather forecast for the next 5 days
- Backend server handles API requests securely

## Tech Stack
- ReactJS
- Node.js + Express
- OpenWeatherMap API

## Setup Instructions

### Backend Setup (server/)
1. Run `npm install` to install dependencies
2. Create a `.env` file with your OpenWeatherMap API key:
   ```
   WEATHER_API_KEY=your_openweather_api_key
   ```
3. Run the server:
   ```bash
   node index.js
   ```

### Frontend Setup (client/)
1. Run `npm install` inside the `client/` directory
2. Start the development server:
   ```bash
   npm start
   ```

Ensure the backend is running at `http://localhost:5000` before using the frontend.