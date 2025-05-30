// AppContent.jsx
import React, { useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWeather } from './context/WeatherContext';
import { useTheme } from './context/ThemeContext';
import AutoSuggest from './components/AutoSuggest';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import Button from './components/common/Button';
import { Sun as SunIcon, Moon as MoonIcon, Thermometer as ThermometerIcon, Cloud } from 'lucide-react';

function AppContent() {
  const { weather, forecast, loading, error, fetchWeatherByCity, toggleUnit, unit } = useWeather();
  const { toggleTheme, isDark } = useTheme();

  const handleCitySelect = useCallback((city) => {
    fetchWeatherByCity(city);
    toast.success(`Weather data loaded for ${city}`, {
      icon: '🌤️',
      // These classes ensure toast matches theme
      className: 'backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80',
    });
  }, [fetchWeatherByCity]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity);
    }
  }, [fetchWeatherByCity]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load weather data: ${error}`, {
        // These classes ensure toast matches theme
        className: 'backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80',
      });
    }
  }, [error]);

  // If you want the background pattern to be directly defined here (instead of bg-pattern-light class)
  // const backgroundPattern = `bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%226366f1%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3Ccircle%20cx=%2252%22%20cy=%227%22%20r=%221%22/%3E%3Ccircle%20cx=%227%22%20cy=%2252%22%20r=%221%22/%3E%3Ccircle%20cx=%2252%22%20cy=%2252%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] dark:bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22f8fafc%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3Ccircle%20cx=%2252%22%20cy=%227%22%20r=%221%22/%3E%3Ccircle%20cx=%227%22%20cy=%2252%22%20r=%221%22/%3E%3Ccircle%20cx=%2252%22%20cy=%2252%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')];
  // And use it like: <div className={`absolute inset-0 z-0 ${backgroundPattern}`}></div>

  return (
    <div className={`relative min-h-screen ${isDark ? 'dark' : 'light'}`}>
      {/* Background Pattern - assuming bg-pattern-light is defined in global CSS with dark variants */}
      <div className="absolute inset-0 z-0 bg-pattern-light"></div>

      {/* Content Container */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap mb-8">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Cloud className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-400">
                Weather App
              </h1>
            </div>

            {/* Controls */}
            <div className="flex gap-3 flex-wrap items-center justify-center sm:justify-end">
              <Button
                onClick={toggleTheme}
                icon={isDark ? SunIcon : MoonIcon}
                variant="glass"
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                <span className="hidden sm:inline">
                  {isDark ? 'Light' : 'Dark'}
                </span>
              </Button>
              <Button
                onClick={toggleUnit}
                icon={ThermometerIcon}
                variant="glass"
                aria-label={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
              >
                <span className="hidden sm:inline">°</span>
                {unit === 'metric' ? 'F' : 'C'}
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-8 w-full">
            <AutoSuggest onSelect={handleCitySelect} />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12" aria-live="polite">
              <div className="flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 dark:border-blue-400 border-t-transparent"></div>
                <span className="text-slate-600 dark:text-slate-300 font-medium">
                  Loading weather data...
                </span>
              </div>
            </div>
          )}

          {/* Weather & Forecast Display */}
          {!loading && !error && (
            <div className="space-y-6">
              <WeatherDisplay weather={weather} />
              <ForecastDisplay forecast={forecast} />
            </div>
          )}
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? 'dark' : 'light'}
        toastClassName="backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      />
    </div>
  );
}

export default AppContent;