import React, { useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWeather } from './context/WeatherContext';
import { useTheme } from './context/ThemeContext';
import AutoSuggest from './components/AutoSuggest';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import Button from './components/common/Button';
import {
  Sun as SunIcon,
  Moon as MoonIcon,
  Thermometer as ThermometerIcon,
  Cloud,
} from 'lucide-react';

function AppContent() {
  const {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
    toggleUnit,
    unit,
  } = useWeather();

  const { toggleTheme, isDark } = useTheme();

  const handleCitySelect = useCallback(
    (city) => {
      fetchWeatherByCity(city);
      toast.success(`Weather data loaded for ${city}`, {
        icon: '🌤️',
        className:
          'backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white',
      });
    },
    [fetchWeatherByCity]
  );

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeatherByCity(lastCity);
    }
  }, [fetchWeatherByCity]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load weather data: ${error}`, {
        className:
          'backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white',
      });
    }
  }, [error]);

  return (
    <div className="relative min-h-screen bg-pattern-light dark:bg-pattern-dark transition-colors duration-500">
      {/* Overlay background pattern */}
      <div className="absolute inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Cloud className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100">
                Weather App
              </h1>
            </div>
          </header>

          {/* Search Field */}
          <div className="mb-8">
            <AutoSuggest onSelect={handleCitySelect} />
          </div>

          {/* Loading Indicator */}
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

          {/* Weather Content */}
          {!loading && !error && (
            <div className="space-y-6">
              <WeatherDisplay weather={weather} />
              <ForecastDisplay forecast={forecast} />
            </div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
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
        toastClassName="backdrop-blur-sm rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      />
    </div>
  );
}

export default AppContent;
