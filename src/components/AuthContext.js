import React, { useState, useEffect } from 'react';
import WeatherDetails from '../components/WeatherDetails';
import WeatherServices from '../api/WeatherServices';
import useAuth from '../components/useAuth';

const Home = () => {
  const { user } = useAuth();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [savedWeatherData, setSavedWeatherData] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const userKey = user ? user.email : 'guest';

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`savedLocations-${userKey}`));
    const savedWeather = JSON.parse(localStorage.getItem(`savedWeatherData-${userKey}`));
    if (saved) setSavedLocations(saved);
    if (savedWeather) setSavedWeatherData(savedWeather);
  }, [userKey]);

  useEffect(() => {
    if (city) fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      const response = await WeatherServices.getWeatherByCity(city);
      const data = response.data;

      if (!data || !data.main || !data.weather || !data.weather[0]) {
        console.error('Invalid weather data format:', data);
        setWeatherData(null);
        return;
      }

      const formattedData = {
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        weatherDescription: data.weather[0].description,
        dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      };

      setWeatherData(formattedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  const saveLocation = (locationData) => {
    const existingLocation = savedLocations.find(loc => loc.city === locationData.city);
    if (!existingLocation) {
      const updatedLocations = [...savedLocations, locationData];
      setSavedLocations(updatedLocations);
      localStorage.setItem(`savedLocations-${userKey}`, JSON.stringify(updatedLocations));
    }
  };

  const saveWeatherData = () => {
    if (weatherData) {
      // Save the weather data, ensuring it's unique per city
      const existingWeatherData = savedWeatherData.some(data => data.city === weatherData.city);
      if (!existingWeatherData) {
        const updatedWeatherData = [...savedWeatherData, weatherData];
        setSavedWeatherData(updatedWeatherData);
        localStorage.setItem(`savedWeatherData-${userKey}`, JSON.stringify(updatedWeatherData));
      }
      // Also save the location as part of the saved locations
      saveLocation(weatherData);
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const appClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={`container ${appClass}`}>
      <button onClick={toggleDarkMode}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
        />
        <button type="submit">Search</button>
        {weatherData && (
          <button type="button" onClick={saveWeatherData}>
            Save Weather
          </button>
        )}
      </form>

      <h3>Saved Locations</h3>
      <div className="saved-container">
        {savedLocations && savedLocations.length > 0 ? (
          savedLocations.map((location, index) => (
            <div key={index} className="saved-card" onClick={() => setCity(location.city)}>
              📍 {location.city}
            </div>
          ))
        ) : (
          <p>No saved locations yet.</p>
        )}
      </div>

      <h3>Saved Weather Data</h3>
      <div className="saved-container">
        {savedWeatherData && savedWeatherData.length > 0 ? (
          savedWeatherData.map((data, index) => (
            <div key={index} className="saved-card">
              🌦️ <strong>{data.city}</strong><br />
              Temperature: {data.temperature}°C<br />
              Humidity: {data.humidity}%<br />
              Description: {data.weatherDescription}
            </div>
          ))
        ) : (
          <p>No saved weather data yet.</p>
        )}
      </div>

      {weatherData && <WeatherDetails data={weatherData} />}
    </div>
  );
};

export default Home;
