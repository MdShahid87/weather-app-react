import { useState, useCallback } from 'react';
import {
  getWeatherAndForecastByCity,
  getWeatherAndForecastByCoordinates,
} from '../services/weatherApi';
import { addRecentSearch } from '../utils/weatherUtils';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = useCallback(async (city) => {
    const trimmed = city.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { weather: weatherData, forecast: forecastData } =
        await getWeatherAndForecastByCity(trimmed);

      setWeather(weatherData);
      setForecast(forecastData);
      addRecentSearch(weatherData.name || trimmed);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const { weather: weatherData, forecast: forecastData } =
            await getWeatherAndForecastByCoordinates(latitude, longitude);

          setWeather(weatherData);
          setForecast(forecastData);

          if (weatherData.name) addRecentSearch(weatherData.name);
        } catch (err) {
          setWeather(null);
          setForecast([]);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setLoading(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setError(
            'Location permission denied. Please enable location access or search manually.'
          );
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          setError('Location information is unavailable. Please try again.');
        } else {
          setError('Unable to retrieve your location. Please try again.');
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    clearError,
  };
}
