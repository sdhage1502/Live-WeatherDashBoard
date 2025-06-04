import React, { useEffect, useCallback, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useWeather } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import WeatherAISummary, { WeatherAssistantButton } from './components/WeatherAISummary';

import {
  Cloud,
} from 'lucide-react';

function AppContent() {
  const {
    weather,
    forecast,
    loading,
    error,
    fetchWeatherByCity,
  } = useWeather();

  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleCitySelect = useCallback(
    (city) => {
      fetchWeatherByCity(city);
      toast.success(`Weather data loaded for ${city}`, {
        icon: '🌤️',
        className:
          'backdrop-blur-sm rounded-xl bg-slate-800/80 text-white',
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
        className: 'backdrop-blur-sm rounded-xl bg-slate-800/80 text-white',
      });
    }
  }, [error]);

  return (
    <div className="relative min-h-screen bg-pattern-dark transition-colors duration-500">
      {/* Overlay background pattern */}
      <div className="absolute inset-0 z-0 bg-gray-800" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto w-full">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                <Cloud className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-100">
                Weather App
              </h1>
            </div>

            {/* AI Assistant Button */}
            {weather && forecast && (
              <WeatherAssistantButton onClick={() => setIsAIModalOpen(true)} />
            )}
          </header>

          {/* Search Field */}
          <div className="mb-8">
            <SearchBar onSelect={handleCitySelect} />
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center justify-center py-12" aria-live="polite">
              <div className="flex items-center gap-3 px-6 py-3 bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-400 border-t-transparent"></div>
                <span className="text-slate-300 font-medium">
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

      {/* AI Assistant Modal */}
      <WeatherAISummary 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="theme"
      />
    </div>
  );
}

export default AppContent;