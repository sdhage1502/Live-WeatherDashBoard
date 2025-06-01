import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { WeatherProvider } from './context/WeatherContext';


import AppContent from './Appcontent';

function App() {
  return (

      <WeatherProvider>
        <AppContent />
      </WeatherProvider>

  );
}

export default App;
