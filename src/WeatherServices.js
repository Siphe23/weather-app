
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherByLocation = (lat, lon) => {
  return axios.get(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
};

const getHourlyForecast = (lat, lon) => {
  return axios.get(`${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely&units=metric&appid=${API_KEY}`);
};

const getDailyForecast = (lat, lon) => {
  return axios.get(`${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
};

export default {
  getWeatherByLocation,
  getHourlyForecast,
  getDailyForecast,
};
