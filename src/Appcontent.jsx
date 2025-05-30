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

  return (
    // The 'dark' class is dynamically added/removed to the <html> element by ThemeContext
    // No need for ${isDark ? 'dark' : 'light'} on this div.
    <div className="relative min-h-screen">
      {/* Background Pattern - Tailwind will handle dark:bg-pattern-dark based on <html> 'dark' class */}
      <div className="absolute inset-0 z-0 bg-pattern-light dark:bg-pattern-dark"></div>

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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
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
        position="top-center"
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