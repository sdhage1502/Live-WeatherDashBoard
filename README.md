
# 🌦️ Smart Weather Forecast App with AI Assistant

A modern, AI-powered weather forecasting web app built using **React + Vite**, offering real-time weather updates, dynamic city suggestions, intelligent summaries, and climate-aware question answering powered by Meta LLaMA 3.3 through OpenRouter.

---

## 🧠 Summary

This project combines traditional weather APIs with a conversational AI assistant that transforms raw weather data into meaningful insights. It provides a highly engaging experience by summarizing conditions and answering smart weather-related questions, all in a clean and responsive UI.

---

## 🎯 Purpose

To help users not only view weather data but **understand it contextually**, with advice on when to go out, what to wear, and whether it's safe to travel — using natural language AI responses.

---

## 🔧 Tech Stack

| Layer              | Technology                      |
| ------------------ | ------------------------------- |
| Frontend Framework | React.js (Vite)                 |
| Styling            | Tailwind CSS                    |
| Weather API        | OpenWeatherMap API              |
| City Suggestions   | OpenWeatherMap Geocoding API    |
| AI Integration     | OpenRouter API (Meta LLaMA 3.3) |
| State Management   | React Context API               |
| Notifications      | react-toastify                  |
| Storage            | localStorage                    |

---

## 🚀 Features

### 🔍 City Search with Smart Suggestions
- Uses OpenWeather Geocoding API for autocomplete
- Displays city, state, and country
- Improves UX for search clarity and accuracy

### 🕘 Recent City History
- Stores last 3 cities in `localStorage`
- Displays under search bar for quick reuse

### 🌤️ Real-Time Weather & Forecast
- Displays:
  - Temperature
  - Wind
  - Humidity
  - Pressure
  - Conditions
- Includes a 5-day forecast (filtered every 8 intervals)

### 🤖 AI Weather Summary (via LLaMA 3.3)
- Human-readable summary of current weather
- Generated using OpenRouter’s free Meta LLaMA model
- Triggered automatically after a city is searched

### ❓ Smart Climate Q&A
- AI dynamically generates questions based on weather/climate
- Provides answers like:
  - “Is it safe to go hiking?”
  - “Should I wear light clothes today?”
  - “Will it rain later?”

### 📊 Weather Overview (Visual Layout)
- Displays:
  - Preloaded question/answer placeholders
  - Current weather details
  - 5-day forecast with highs/lows and condition

---

## 🧱 Folder Structure

```

src/
├── api/
│   ├── aiSummary.js            # AI fetch functions (summary, Q\&A)
│   ├── useCitySuggestions.js  # Autocomplete hook for cities
│   └── weatherApi.js          # Weather + forecast API handlers
├── assets/
│   └── react.svg
├── components/
│   ├── Card.jsx               # Weather forecast cards
│   ├── ForecastDisplay.jsx   # Forecast UI component
│   ├── SearchBar.jsx         # City input & suggestions
│   ├── WeatherAISummary.jsx  # Main AI integration (summary & Q\&A)
│   ├── WeatherDisplay.jsx    # Main weather UI
│   └── WeatherOverview\.jsx   # Preloaded Q\&A, current, and forecast layout
├── context/
│   └── WeatherContext.jsx     # App-wide state management
├── App.css
├── App.jsx
├── Appcontent.jsx             # Main view container
├── index.css
└── main.jsx

````

---

## 🌐 API Endpoints Used

### ✅ OpenWeather API
- `GET /data/2.5/weather?q={city}`
- `GET /data/2.5/forecast?q={city}`

### ✅ Geocoding (City Suggestions)
- `GET /geo/1.0/direct?q={query}&limit=5`

### ✅ OpenRouter AI
- `POST /v1/chat/completions`
- Model: `meta-llama/llama-3.3-8b-instruct:free`
- Used for:
  - Weather summary
  - Question generation
  - AI Q&A

---

## 💾 LocalStorage Keys

| Key            | Purpose                                  |
| -------------- | ---------------------------------------- |
| `lastCity`     | Last searched city                       |
| `recentCities` | 3 most recent cities for quick access    |
| `{city_unit}`  | Cached weather/forecast response         |

---

## 🖼️ UI/UX Highlights

- Responsive, Tailwind CSS-based dark UI
- Smooth transition animations
- AI-generated answers shown in formatted blocks
- Live feedback via toast notifications

---

## ✅ Project Highlights

| Feature                  | Status                        |
| ------------------------ | ----------------------------- |
| Autocomplete search      | ✅ Integrated                 |
| Smart city suggestions   | ✅ OpenWeather geocoding      |
| AI weather summarization | ✅ Real-time AI response      |
| Season-aware Q&A         | ✅ Dynamic & adaptive         |
| 5-day forecast rendering | ✅ Tailored day grouping      |
| Responsive UI            | ✅ Tailwind-based design      |

---

## 🔮 Future Enhancements

- 🔊 Voice narration with Web Speech API
- 🗣 Language translation of AI responses
- 📍 Auto-location detection via Geolocation API
- 🧪 Add UV Index and AQI support
- 📨 Email export or share summary
- 🔒 Authenticated dashboard with saved cities

---

## 📌 Use Case Scenarios

- 🌤 Everyday users checking safe travel conditions
- 🧳 Tourists verifying hill station weather
- 🏃 Fitness lovers planning optimal outdoor time
- 👨‍👩‍👧 Families checking safety for kids & elders
- 🧑‍💻 Students learning AI + API integration

---

## 🧾 How to Run Locally

```bash
git clone https://github.com/your-username/smart-weather-app.git
cd smart-weather-app
npm install
````

### Add `.env`

```env
VITE_API_KEY=your_openweather_api_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

### Start Development Server

```bash
npm run dev
```

---

## 🏁 Conclusion

This app is a perfect showcase of how AI can enhance user experience in even the simplest of utilities like weather apps. By combining real-time data, smart search, and conversational intelligence, it delivers a modern, scalable, and human-centered forecast experience.

---

## 👨‍💻 Author

**Shreyash Dhage**
Frontend Developer
[GitHub](https://github.com/yourusername) • [LinkedIn](https://linkedin.com/in/yourname) • [Portfolio](https://yourportfolio.com)

---

## 📄 License

MIT License © 2025

```

