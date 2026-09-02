# 🌤️ SkyCast — Weather App

A modern and responsive weather dashboard built with **React.js, Vite, Tailwind CSS, Axios, and the Open-Meteo REST API**.

SkyCast allows users to search for any city, view real-time weather conditions, check a 5-day forecast, use their current location, switch between light and dark mode, and access recently searched cities.

## 🚀 Live Demo
🔗 **GitHub:** https://github.com/MdShahid87/weather-app-react

## 📌 About The Project
SkyCast is a responsive weather application created as a frontend development portfolio project.

The application consumes weather data from the **Open-Meteo REST API** and displays current weather conditions and a 5-day forecast in a clean and responsive interface.

The project focuses on:

* React component architecture
* REST API integration
* Asynchronous JavaScript
* Browser Geolocation API
* LocalStorage
* Responsive UI design
* Dark mode
* Error and loading state management

---

## ✨ Features

### 🌍 City Weather Search

Search for a city and view its current weather information.

### 📍 Current Location

Use the browser's Geolocation API to retrieve weather information for your current location.

### 🌡️ Current Weather

Displays:

* City name
* Country
* Current temperature
* Feels-like temperature
* Weather condition
* Weather icon
* Humidity
* Wind speed
* Wind direction
* Atmospheric pressure
* Visibility
* Sunrise
* Sunset

### 📅 5-Day Forecast

Displays:

* Date
* Weather condition
* Weather icon
* Minimum temperature
* Maximum temperature

### 🌙 Dark Mode

Switch between light and dark themes.

The selected theme is stored using `localStorage`.

### 🔎 Recent Searches

Recently searched cities are stored in `localStorage` and can be searched again with one click.

### ⏳ Loading State

Displays a loading indicator while weather data is being retrieved.

### ❌ Error Handling

Handles:

* Invalid city names
* Empty searches
* Network errors
* API errors
* Location permission errors
* Unsupported geolocation

### 📱 Responsive Design

The application works across:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🛠️ Tech Stack

| Technology      | Purpose                       |
| --------------- | ----------------------------- |
| React.js        | Frontend UI                   |
| Vite            | Development and build tool    |
| JavaScript      | Application logic             |
| Tailwind CSS    | Styling and responsive design |
| Axios           | HTTP requests                 |
| React Icons     | Weather and UI icons          |
| Open-Meteo API  | Weather data                  |
| Geolocation API | Current location              |
| LocalStorage    | Theme and recent searches     |
| Git             | Version control               |
| GitHub          | Source code hosting           |

---

## 🌐 API

This project uses the **Open-Meteo API** for weather data and geocoding.

### APIs used

**Geocoding API**

Used to convert a city name into latitude and longitude.

**Forecast API**

Used to retrieve:

* Current weather
* Temperature
* Humidity
* Wind
* Pressure
* Visibility
* Sunrise
* Sunset
* 5-day forecast

No API key is required for the current Open-Meteo implementation.

---

## 📂 Project Structure

```text
weather-app/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Forecast.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   ├── SearchBar.jsx
│   │   ├── WeatherStats.jsx
│   │   └── WelcomeScreen.jsx
│   │
│   ├── hooks/
│   │   └── useWeather.js
│   │
│   ├── services/
│   │   └── weatherApi.js
│   │
│   ├── utils/
│   │   └── weatherUtils.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## 🔧 Environment Variables

The current version uses Open-Meteo and does not require an API key.

An `.env.example` file is included for future environment variables.

If you add an API key in the future, create:

```text
.env
```

and keep it out of GitHub.

Never commit private API keys or secrets.

---

## 🧠 How The Application Works

### City Search

```text
User enters city
       ↓
Geocoding API
       ↓
Latitude + Longitude
       ↓
Open-Meteo Forecast API
       ↓
Weather + Forecast Data
       ↓
React Components
       ↓
Weather Dashboard
```

### Current Location

```text
User clicks "My Location"
          ↓
Browser Geolocation API
          ↓
Latitude + Longitude
          ↓
Reverse Geocoding
          ↓
Weather API
          ↓
Weather Dashboard
```

---

## 💾 LocalStorage

SkyCast uses browser `localStorage` for:

### Recent searches

```text
weather_recent_searches
```

### Theme preference

```text
weather_theme
```

This allows the application to remember the user's recent cities and preferred theme.

---

## 📱 Responsive Design

The interface is designed for different screen sizes.

### Desktop

* Full weather dashboard
* Multi-column statistics
* Large weather cards

### Tablet

* Responsive grid layout
* Optimized spacing

### Mobile

* Stacked layout
* Mobile-friendly search
* Responsive forecast cards
* Touch-friendly buttons

---

## 🎯 Learning Objectives

This project helped me practice:

* React functional components
* React Hooks
* `useState`
* `useEffect`
* `useCallback`
* Custom React Hooks
* REST API integration
* Axios
* Async/Await
* Error handling
* Browser Geolocation API
* LocalStorage
* Tailwind CSS
* Responsive design
* Component-based architecture
* Git and GitHub

---

## 🔮 Future Improvements

Possible future features:

* [ ] Hourly weather forecast
* [ ] Weather charts
* [ ] Air quality information
* [ ] Favorite cities
* [ ] Temperature unit conversion
* [ ] Weather alerts
* [ ] More detailed weather information
* [ ] Animated weather backgrounds
* [ ] PWA support
* [ ] Improved accessibility
* [ ] Weather history

---

## 👨‍💻 Author

**Md Shahid**

Frontend Developer

### Skills

* HTML5
* CSS3
* JavaScript
* React.js
* Tailwind CSS
* Redux Toolkit
* Bootstrap
* Material UI
* Git
* GitHub

---

## ⭐ If You Like This Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and portfolio purposes.
