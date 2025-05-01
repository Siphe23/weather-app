import React from 'react';

const WeatherDetails = ({ data, dailyForecast }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Humidity: {data.main.humidity} %</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>

      {/* Display daily forecast */}
      <h3>Daily Forecast</h3>
      {dailyForecast && dailyForecast.length > 0 ? (
        <ul>
          {dailyForecast.map((forecast, index) => (
            <li key={index}>
              <strong>{new Date(forecast.dt * 1000).toLocaleDateString()}</strong><br />
              Temp: {forecast.temp.day}°C, {forecast.weather[0].description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No daily forecast data available</p>
      )}
    </div>
  );
};

export default WeatherDetails;
