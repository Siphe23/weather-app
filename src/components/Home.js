import React, { useEffect, useState } from 'react';
import WeatherServices from '../WeatherServices';
import '../components/Home.css';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [weeklyForecast, setWeeklyForecast] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [savedLocations, setSavedLocations] = useState(() => JSON.parse(localStorage.getItem('savedLocations')) || []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      fetchWeather(location.lat, location.lon);
    }
  }, [location]);

  const fetchWeather = (lat, lon) => {
    WeatherServices.getWeatherByLocation(lat, lon)
      .then((response) => {
        setWeatherData(response.data);
        return WeatherServices.getDailyForecast(lat, lon);
      })
      .then((response) => {
        setWeeklyForecast(response.data.daily);
      })
      .catch((error) => console.error('Weather API error:', error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    WeatherServices.getWeatherByCity(searchQuery)
      .then((response) => {
        const { lat, lon } = response.data.coord;
        setLocation({ lat, lon });
        fetchWeather(lat, lon);
      })
      .catch((error) => console.error('City search error:', error));
  };

  const handleSaveLocation = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    WeatherServices.getWeatherByCity(city)
      .then((response) => {
        const { lat, lon } = response.data.coord;
        const newLocation = { city, lat, lon };
        const updatedLocations = [...savedLocations, newLocation];
        setSavedLocations(updatedLocations);
        localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
      })
      .catch((error) => console.error('City save error:', error));
  };

  const handleSwitchLocation = (lat, lon) => {
    setLocation({ lat, lon });
    fetchWeather(lat, lon);
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city"
        />
        <button type="submit">Search</button>
      </form>
      <form onSubmit={handleSaveLocation} className="save-form">
        <input
          type="text"
          name="city"
          placeholder="Save this location"
        />
        <button type="submit">Save Location</button>
      </form>
      {savedLocations.length > 0 && (
        <div className="saved-locations">
          <h2>Saved Locations</h2>
          <div className="card-grid">
            {savedLocations.map((loc, index) => (
              <div key={index} className="card" onClick={() => handleSwitchLocation(loc.lat, loc.lon)}>
                <div className="card-content">
                  <h3>{loc.city}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {weatherData && (
        <div className="weather-card">
          <h1>Weather in {weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
      {weeklyForecast && (
        <div className="weekly-forecast">
          <h2>Weekly Forecast</h2>
          <div className="card-grid">
            {weeklyForecast.map((day, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <p>Day {index + 1}</p>
                  <p>Temperature: {day.temp.day} °C</p>
                  <p>Weather: {day.weather[0].description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
