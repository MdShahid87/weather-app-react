export function formatTime(timestampOrIso, timezoneOffset = 0) {
  const date =
    typeof timestampOrIso === "string"
      ? new Date(timestampOrIso)
      : new Date((timestampOrIso + timezoneOffset) * 1000);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...(typeof timestampOrIso === "string" ? {} : { timeZone: "UTC" }),
  });
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function getWeatherIconUrl(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function processForecastData(forecastList) {
  const dailyMap = new Map();

  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        date,
        temps: [item.main.temp_min, item.main.temp_max],
        icon: item.weather[0].icon,
        condition: item.weather[0].description,
        dt_txt: item.dt_txt,
      });
    } else {
      const existing = dailyMap.get(date);
      existing.temps.push(item.main.temp_min, item.main.temp_max);

      // Prefer midday forecast for icon/condition
      const hour = parseInt(item.dt_txt.split(" ")[1].split(":")[0], 10);
      if (hour === 12) {
        existing.icon = item.weather[0].icon;
        existing.condition = item.weather[0].description;
        existing.dt_txt = item.dt_txt;
      }
    }
  });

  return Array.from(dailyMap.values())
    .slice(0, 5)
    .map((day) => ({
      date: day.date,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      icon: day.icon,
      condition: capitalizeWords(day.condition),
    }));
}

/*Convert meters to kilometers for visibility display.*/
export function metersToKm(meters) {
  return (meters / 1000).toFixed(1);
}

/*Get wind direction label from degrees. */
export function getWindDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

const RECENT_SEARCHES_KEY = "weather_recent_searches";
const THEME_KEY = "weather_theme";
const MAX_RECENT_SEARCHES = 5;

export function getRecentSearches() {
  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(city) {
  const normalized = city.trim();
  if (!normalized) return;

  const recent = getRecentSearches().filter(
    (item) => item.toLowerCase() !== normalized.toLowerCase(),
  );
  recent.unshift(normalized);

  localStorage.setItem(
    RECENT_SEARCHES_KEY,
    JSON.stringify(recent.slice(0, MAX_RECENT_SEARCHES)),
  );
}
export function removeRecentSearch(city) {
  const recent = getRecentSearches().filter(
    (item) => item.toLowerCase() !== city.toLowerCase(),
  );

  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent));
}

export function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function setStoredTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  setStoredTheme(theme);
}
