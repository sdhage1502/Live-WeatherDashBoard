import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WeatherProvider } from './context/WeatherContext';
import { ThemeProvider } from './context/ThemeContext';

import AppContent from './Appcontent';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <AppContent />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
