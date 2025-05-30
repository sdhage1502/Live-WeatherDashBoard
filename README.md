
# Weather App

## Introduction

The Weather App is a responsive web application that provides real-time weather information for cities around the world. Users can search for a city and instantly get detailed weather data such as temperature, humidity, wind speed, and weather conditions. The app offers recent search suggestions, smooth UI animations, and supports both desktop and mobile views.


---

## Tech Stack

- **Frontend:** Vite , React.js (with functional components and hooks)  
- **Styling:** Tailwind CSS for modern, responsive design  
- **Icons:** Lucide React for clean SVG icons  
- **State Management:** React useState and useEffect hooks  
- **API:** OpenWeatherMap API (or any other weather data API you use)  
- **Build & Deployment:** Vercel / Netlify / any static hosting platform

---

## Features

- Search weather by city name with autosuggestions  
- Display current temperature, weather conditions, humidity, and wind speed  
- Recent search history saved locally for quick access  
- Mobile-friendly and responsive design  
- Loading indicators for API calls  
- Clear and easy-to-use UI with intuitive interactions  

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or above) and npm installed on your machine

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/sdhage1502/Live-WeatherDashBoard
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env.local` file in the root directory and add your API key:

   ```
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

   This will start the app on `http://localhost:5173`.

---

## Usage

- Enter a city name in the search bar  
- Select from suggestions or press Enter  
- View the current weather data for the selected city  
- Use recent searches for quick lookups


---

## Future Improvements

- Add 7-day weather forecast  
- Include geolocation to detect user location automatically  
- Add dark mode support  
- Integrate additional weather APIs for richer data  
- Enhance accessibility features  

---

## Contributing

Contributions are welcome! Please fork the repo and create a pull request for any feature improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Contact

Created by Shreyash Dhage — feel free to reach out at [sdhage1502@gmail.com]
