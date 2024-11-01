import React from 'react';

const WeatherDetails = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Humidity: {data.main.humidity} %</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
      {/* Display daily forecast */}
    </div>
  );
};

export default WeatherDetails;
