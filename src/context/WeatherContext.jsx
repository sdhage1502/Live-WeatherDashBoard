import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentWeather, getForecast } from '../api/weatherApi';
import { toast } from 'react-toastify';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [city, setCity] = useState(null);

  const fetchWeatherByCity = useCallback(async (cityName, forceFetch = false) => {
    if (!cityName) return;

    const storageKey = `${cityName}_${unit}`;
    const cachedData = !forceFetch ? JSON.parse(localStorage.getItem(storageKey)) : null;

    if (cachedData) {
      setWeather(cachedData.weather);
      setForecast(cachedData.forecast);
      setCity(cityName);
      return;
    }

    setLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(cityName, unit),
        getForecast(cityName, unit),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setCity(cityName);
      localStorage.setItem('lastCity', cityName);
      localStorage.setItem(storageKey, JSON.stringify({ weather: weatherData, forecast: forecastData }));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [unit]);

  useEffect(() => {
    if (city) fetchWeatherByCity(city, true); // Force refetch when unit or city changes
  }, [unit, city, fetchWeatherByCity]);

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <WeatherContext.Provider
      value={{ weather, forecast, loading, unit, fetchWeatherByCity, toggleUnit }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
