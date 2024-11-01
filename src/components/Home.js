import React, { useState, useEffect } from 'react';
import WeatherDetails from '../components/WeatherDetails';
import WeatherServices from '../api/WeatherServices';
import useAuth from '../components/useAuth'; // Import the useAuth hook

const Home = () => {
  const { user } = useAuth(); // Use the useAuth hook
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [savedLocations, setSavedLocations] = useState([]);
  const [savedWeatherData, setSavedWeatherData] = useState([]); // State for saved weather data
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeather = async () => {
    try {
      if (city) {
        const response = await WeatherServices.getWeatherByCity(city);
        setWeatherData(response.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedLocations'));
    if (saved) {
      setSavedLocations(saved);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [city]); // Re-fetch when city changes

  const handleSearch = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  const saveLocation = (location) => {
    if (!savedLocations.includes(location)) {
      const updatedLocations = [...savedLocations, location];
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations)); // Persist in local storage
    }
  };

  const saveWeatherData = () => {
    if (weatherData && !savedWeatherData.includes(weatherData)) {
      const updatedWeatherData = [...savedWeatherData, weatherData];
      setSavedWeatherData(updatedWeatherData);
      localStorage.setItem('savedWeatherData', JSON.stringify(updatedWeatherData)); // Persist in local storage
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const appClass = isDarkMode ? 'dark-mode' : 'light-mode';

  return (
    <div className={appClass}>
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
      <ul>
        {savedLocations.map((location, index) => (
          <li key={index} onClick={() => setCity(location)}>
            {location}
          </li>
        ))}
      </ul>

      <h3>Saved Weather Data</h3>
      <ul>
        {savedWeatherData.map((data, index) => (
          <li key={index}>
            {data.city} - {data.temperature}°C {/* Adjust to match your weather data structure */}
          </li>
        ))}
      </ul>

      {weatherData && <WeatherDetails data={weatherData} />}
    </div>
  );
};

export default Home;
