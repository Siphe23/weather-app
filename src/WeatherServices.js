import axios from 'axios';
 const API_KEY = '5efd33c0b51ce7127a4894fc8407b559';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const getWeatherByLocation = (lat, lon) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: API_KEY,
    },
  });
};

const getDailyForecast = (lat, lon) => {
  return axios.get(`${BASE_URL}/onecall`, {
    params: {
      lat,
      lon,
      exclude: 'hourly,minutely',
      units: 'metric',
      appid: API_KEY,
    },
  });
};

const getWeatherByCity = (city) => {
  return axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
};

export default {
  getWeatherByLocation,
  getDailyForecast,
  getWeatherByCity,
};









