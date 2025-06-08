

# 🌦️ **Smart Weather Forecast App with AI Assistant**

---

## 🧠 Summary

This project is a **feature-rich, AI-powered weather application** built using **React + Vite**. It combines traditional weather data with intelligent, AI-generated **summaries, climate tips, and Q\&A** to deliver an experience that goes far beyond numbers and charts.

---

## 🎯 Purpose

The goal is to give users **not just data**, but **meaningful insights and guidance** about the weather in their city, seasonally and contextually — using a natural language AI assistant.

---

## 🔧 Tech Stack

| Layer              | Technology                      |
| ------------------ | ------------------------------- |
| Frontend Framework | React.js (with Vite)            |
| Styling            | Tailwind CSS                    |
| API Fetching       | Axios / fetch API               |
| Weather Data       | OpenWeatherMap API              |
| City Suggestions   | OpenWeatherMap Geocoding API    |
| AI Assistant       | OpenRouter API (Meta LLaMA 3.3) |
| Notifications      | react-toastify                  |
| State Management   | React Context API               |
| Data Caching       | localStorage                    |

---

## 🚀 Features

### 🔍 1. **City Search with Smart Suggestions**

* Uses OpenWeather's **Geocoding API** to suggest cities dynamically.
* Matches include city name, state, and country.
* Improves UX by preventing typos and confusion.

### 🕘 2. **Recent City History**

* Last 3 searched cities are saved in `localStorage`.
* Displayed under the search bar for quick access.
* Encourages repeat visits and easier navigation.

### 🌤️ 3. **Current Weather + 5-Day Forecast**

* Fetches **real-time data** from OpenWeatherMap.
* Includes:

  * Temperature
  * Wind speed/direction
  * Humidity
  * Pressure
  * Weather description
* Users can toggle between **Celsius and Fahrenheit**.

### 🤖 4. **AI-Powered Weather Summary**

* Automatically triggered when a city is searched.
* Uses `meta-llama/llama-3.3-8b-instruct:free` model via **OpenRouter API**.
* Transforms raw weather data into:

  * Friendly daily summary
  * Human-readable insights
  * Examples:

    > “Expect warm sunshine in the afternoon and slightly windy conditions in the evening.”

### ❓ 5. **Dynamic Smart Questions**

* AI dynamically creates **climate-appropriate questions**:

  * “Do I need sunscreen today?”
  * “Is it good weather to go hiking?”
  * “Will there be snowfall or fog this weekend?”
* Questions change based on:

  * Season
  * Temperature
  * Rainfall
  * Wind

### 🧠 6. **AI Answers & Advice**

* AI answers the generated questions with personalized climate insights.
* Offers recommendations on:

  * Clothing
  * Travel safety
  * Activity suitability
  * Rain protection
  * Health considerations for elders/kids

---

## 🧱 Folder Structure Overview

```
📦src
 ┣ 📂components
 ┃ ┗ 📄WeatherAISummary.jsx  ← main AI UI logic
 ┣ 📂context
 ┃ ┗ 📄WeatherContext.jsx     ← state management
 ┣ 📂api
 ┃ ┗ 📄aiSummary.js           ← AI fetch functions
 ┣ 📂assets, App.jsx, main.jsx ...
```

---

## 🌐 API Usage

### ✅ Weather API

* `GET https://api.openweathermap.org/data/2.5/weather?q={city}`
* `GET https://api.openweathermap.org/data/2.5/forecast?q={city}`

### ✅ Geocoding API

* `GET https://api.openweathermap.org/geo/1.0/direct?q={query}&limit=5`

### ✅ OpenRouter AI API

* `POST https://openrouter.ai/api/v1/chat/completions`
* Uses model: `meta-llama/llama-3.3-8b-instruct:free`
* Requires: `VITE_OPENROUTER_API_KEY` in `.env`

---

## 💾 LocalStorage Usage

| Key            | Purpose                                  |
| -------------- | ---------------------------------------- |
| `lastCity`     | Stores last searched city                |
| `recentCities` | Stores last 3 cities for quick selection |
| `{city_unit}`  | Cache for city-specific weather/forecast |

---

## 🖼️ UI/UX Highlights

* Clean, dark-themed, Tailwind-based layout
* Accessible and mobile-first responsive design
* Smooth transitions and animated loaders
* AI summaries and answers displayed with spacing and preformatted text
* Toast notifications for errors/loading/success

---

## ✅ Project Highlights

| Feature                       | Value                        |
| ----------------------------- | ---------------------------- |
| City autocomplete             | ✅ Enhances user search       |
| AI weather assistant          | ✅ Makes weather data useful  |
| Smart seasonal questions      | ✅ Context-aware intelligence |
| Voice-ready UI (future scope) | 🟡 Text now, audio possible  |
| Works across all seasons      | ✅ Hot, Cold, Rain, Fog, Snow |
| Extensible design             | ✅ Add features easily        |

---

## 💡 Future Enhancements

* 🌐 Add voice narration (Web Speech API)
* 🧑‍💻 Let users ask their own custom weather questions
* 🗣️ Translate AI summary to local languages
* 📍 Auto-detect user location via Geolocation API
* 📊 Add Air Quality Index (AQI) and UV index
* 📈 Weather alerts or warning cards

---

## 📌 Ideal For

* Students learning API integration + AI
* Real-world frontend project portfolio
* Smart assistants & productivity tools
* Health/safety-focused weather tools
* Tourism or event planning apps

---

## 🧾 How to Run Locally

```bash
git clone https://your-repo-url
cd your-project
npm install
# Add your API keys to .env
npm run dev
```

```env
VITE_API_KEY=your_openweather_key
VITE_OPENROUTER_API_KEY=sk-xxxxxxx
```

---

## 🏁 Conclusion

This project showcases a next-gen approach to weather forecasting by combining traditional APIs with modern AI technology.

✅ **Functional & dynamic**
✅ **Smart & personalized**
✅ **Deployable, reusable, and scalable**

---

Would you like me to generate this as a **PDF report**, ready for your GitHub/portfolio or college submission?

Let me know — I can generate and upload it instantly.
