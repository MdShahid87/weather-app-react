import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import WeatherStats from "./components/WeatherStats";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import Footer from "./components/Footer";
import WelcomeScreen from "./components/WelcomeScreen";
import { useWeather } from "./hooks/useWeather";
import {
  getRecentSearches,
  getStoredTheme,
  applyTheme,
  removeRecentSearch,
} from "./utils/weatherUtils";

export default function App() {
  const {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    clearError,
  } = useWeather();

  const [theme, setTheme] = useState(getStoredTheme);
  const [recentSearches, setRecentSearches] = useState(getRecentSearches);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleSearch = useCallback(
    async (city) => {
      await fetchWeatherByCity(city);
      setRecentSearches(getRecentSearches());
    },
    [fetchWeatherByCity],
  );
  const handleRemoveRecent = useCallback((city) => {
    removeRecentSearch(city);
    setRecentSearches(getRecentSearches());
  }, []);
  const handleLocationClick = useCallback(async () => {
    await fetchWeatherByLocation();
    setRecentSearches(getRecentSearches());
  }, [fetchWeatherByLocation]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      applyTheme(next);
      return next;
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 transition-colors dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Header
          onSearch={handleSearch}
          onLocationClick={handleLocationClick}
          recentSearches={recentSearches}
          onRecentClick={handleSearch}
          onRemoveRecent={handleRemoveRecent}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        <main className="mt-8 flex-1">
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} onDismiss={clearError} />
            </div>
          )}

          {loading && <Loading />}

          {!loading && weather && (
            <div className="space-y-6 animate-fade-in">
              <CurrentWeather data={weather} />
              <WeatherStats data={weather} />
              <Forecast forecast={forecast} />
            </div>
          )}

          {!loading && !weather && !error && <WelcomeScreen />}
        </main>

        <Footer />
      </div>
    </div>
  );
}
