import React, { useState, useEffect, useCallback } from 'react';
import WeatherServices from '../api/WeatherServices'; // Adjust the path if necessary
import WeatherDetails from '../components/WeatherDetails'; // Make sure the path is correct
import useAuth from '../components/useAuth';

const Home = () => {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [savedWeatherData, setSavedWeatherData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dailyForecast, setDailyForecast] = useState([]);

  const userKey = user ? user.email : 'guest';

  // Save location inside useCallback to avoid unnecessary re-renders
  const saveLocation = useCallback((location) => {
    // Save location if not already saved
    if (!savedLocations.includes(location)) {
      const updatedLocations = [...savedLocations, location];
      setSavedLocations(updatedLocations);
      localStorage.setItem(`savedLocations-${userKey}`, JSON.stringify(updatedLocations));
    }
  }, [savedLocations, userKey]);

  // Save weather data inside useCallback to avoid unnecessary re-renders
  const saveWeatherData = useCallback((weather) => {
    // Save weather data if it's not already saved
    if (!savedWeatherData.some(data => data.city === weather.city)) {
      const updatedWeatherData = [...savedWeatherData, weather];
      setSavedWeatherData(updatedWeatherData);
      localStorage.setItem(`savedWeatherData-${userKey}`, JSON.stringify(updatedWeatherData));
    }
  }, [savedWeatherData, userKey]);

  // Fetch weather data using useCallback to avoid unnecessary re-renders
  const fetchWeather = useCallback(async () => {
    if (city) {
      try {
        const weatherResponse = await WeatherServices.getWeatherByCity(city);
        const data = weatherResponse.data;
        const forecastResponse = await WeatherServices.getDailyForecast(data.coord.lat, data.coord.lon);
        const forecastData = forecastResponse.data.daily;

        setWeatherData({
          name: data.name,
          main: data.main,
          wind: data.wind,
        });

        setDailyForecast(forecastData);
        saveLocation(data.name); // Save location after fetching weather data
        saveWeatherData({
          city: data.name,
          temperature: data.main.temp,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  }, [city, saveLocation, saveWeatherData]); // Add saveLocation and saveWeatherData to the dependencies

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`savedLocations-${userKey}`));
    const savedWeather = JSON.parse(localStorage.getItem(`savedWeatherData-${userKey}`));
    if (saved) setSavedLocations(saved);
    if (savedWeather) setSavedWeatherData(savedWeather);
  }, [userKey]);

  useEffect(() => {
    fetchWeather(); // Trigger fetch when city changes
  }, [city, fetchWeather]); // fetchWeather is now stable due to useCallback

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const appClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`container ${appClass}`}>
      <button onClick={toggleDarkMode}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      <form onSubmit={(e) => { e.preventDefault(); fetchWeather(); }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
        />
        <button type="submit">Search</button>
        {weatherData && (
          <button type="button" onClick={() => saveWeatherData(weatherData)}>
            Save Weather
          </button>
        )}
      </form>

      <h3>Saved Locations</h3>
      <div className="saved-container">
        {savedLocations.map((location, index) => (
          <div key={index} className="saved-card" onClick={() => setCity(location)}>
            📍 {location}
          </div>
        ))}
      </div>

      <h3>Saved Weather Data</h3>
      <div className="saved-container">
        {savedWeatherData.map((data, index) => (
          <div key={index} className="saved-card">
            🌦️ <strong>{data.city}</strong><br />
            Temperature: {data.temperature}°C
          </div>
        ))}
      </div>

      {weatherData && (
        <WeatherDetails data={weatherData} dailyForecast={dailyForecast} />
      )}
    </div>
  );
};

export default Home;
