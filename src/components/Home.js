
import React, { useEffect, useState } from 'react';
import WeatherServices from '../WeatherServices';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      WeatherServices.getWeatherByLocation(location.lat, location.lon)
        .then((response) => setWeatherData(response.data))
        .catch((error) => console.error(error));
    }
  }, [location]);

  if (!weatherData) return <div>Loading...</div>;

  return (
    <div>
      <h1>Weather in {weatherData.name}</h1>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      {/* Add more weather details and forecasts */}
    </div>
  );
};

export default Home;
