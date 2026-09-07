import axios from "axios";
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const REVERSE_GEO_URL = "https://geocoding-api.open-meteo.com/v1/reverse";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

const weatherApi = axios.create({
  timeout: 10000,
});

const FORECAST_PARAMS = {
  current: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "surface_pressure",
    "wind_speed_10m",
    "wind_direction_10m",
    "visibility",
    "is_day",
  ].join(","),

  daily: [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "sunrise",
    "sunset",
  ].join(","),

  timezone: "auto",
  wind_speed_unit: "ms",
};

/* For Error Handling*/
function handleApiError(error) {
  // Preserve errors created by our own application.
  if (error instanceof Error && !error.response) {
    throw error;
  }

  if (error.response) {
    const { status, data } = error.response;

    const message = data?.reason || data?.message;

    if (status === 400) {
      throw new Error(message || "Invalid weather request. Please try again.");
    }

    if (status === 404) {
      throw new Error(
        "City not found. Please check the spelling and try again.",
      );
    }

    if (status === 429) {
      throw new Error("Too many requests. Please wait a moment and try again.");
    }

    if (status >= 500) {
      throw new Error(
        "Weather service is temporarily unavailable. Please try again later.",
      );
    }

    throw new Error(
      message || "Unable to fetch weather data. Please try again.",
    );
  }
  if (error.request) {
    throw new Error("Network error. Please check your internet connection.");
  }
  throw new Error(error.message || "Something went wrong. Please try again.");
}

/*Weather Codes*/
function weatherFromCode(code, isDay = 1) {
  const map = {
    0: { description: "Clear sky", icon: "01" },

    1: { description: "Mainly clear", icon: "01" },
    2: { description: "Partly cloudy", icon: "02" },
    3: { description: "Overcast", icon: "04" },

    45: { description: "Fog", icon: "50" },
    48: { description: "Depositing rime fog", icon: "50" },

    51: { description: "Light drizzle", icon: "09" },
    53: { description: "Moderate drizzle", icon: "09" },
    55: { description: "Dense drizzle", icon: "09" },

    56: { description: "Light freezing drizzle", icon: "09" },
    57: { description: "Dense freezing drizzle", icon: "09" },

    61: { description: "Slight rain", icon: "10" },
    63: { description: "Moderate rain", icon: "10" },
    65: { description: "Heavy rain", icon: "10" },

    66: { description: "Light freezing rain", icon: "13" },
    67: { description: "Heavy freezing rain", icon: "13" },

    71: { description: "Slight snow", icon: "13" },
    73: { description: "Moderate snow", icon: "13" },
    75: { description: "Heavy snow", icon: "13" },
    77: { description: "Snow grains", icon: "13" },

    80: { description: "Slight rain showers", icon: "09" },
    81: { description: "Moderate rain showers", icon: "09" },
    82: { description: "Violent rain showers", icon: "09" },

    85: { description: "Slight snow showers", icon: "13" },
    86: { description: "Heavy snow showers", icon: "13" },

    95: { description: "Thunderstorm", icon: "11" },
    96: {
      description: "Thunderstorm with slight hail",
      icon: "11",
    },
    99: {
      description: "Thunderstorm with heavy hail",
      icon: "11",
    },
  };

  const match = map[code] || {
    description: "Unknown conditions",
    icon: "03",
  };

  const suffix = isDay ? "d" : "n";

  return {
    description: match.description,
    icon: `${match.icon}${suffix}`,
  };
}

/* Data Transformation */

function mapCurrentWeather(data, location) {
  const { current, daily } = data;

  const condition = weatherFromCode(current.weather_code, current.is_day);

  return {
    name: location.name,

    sys: {
      country: location.countryCode || location.country || "",
      sunrise: daily.sunrise?.[0] || null,
      sunset: daily.sunset?.[0] || null,
    },

    main: {
      temp: current.temperature_2m,
      feels_like: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      pressure: Math.round(current.surface_pressure),
    },

    weather: [condition],

    wind: {
      speed: current.wind_speed_10m,
      deg: current.wind_direction_10m,
    },

    visibility: current.visibility ?? 10000,
  };
}

function mapForecast(data) {
  const { daily } = data;

  if (!daily?.time) {
    return [];
  }

  return daily.time.slice(0, 5).map((date, index) => {
    const condition = weatherFromCode(daily.weather_code[index], 1);

    return {
      date,

      minTemp: Math.round(daily.temperature_2m_min[index]),

      maxTemp: Math.round(daily.temperature_2m_max[index]),

      icon: condition.icon,
      condition: condition.description,
    };
  });
}

/*API Calls */

async function fetchForecast(lat, lon) {
  const { data } = await weatherApi.get(FORECAST_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      ...FORECAST_PARAMS,
    },
  });
  return data;
}
async function geocodeCity(city) {
  const trimmedCity = city?.trim();

  if (!trimmedCity) {
    throw new Error("Please enter a city name.");
  }

  const { data } = await weatherApi.get(GEO_URL, {
    params: {
      name: trimmedCity,
      count: 1,
      language: "en",
      format: "json",
    },
  });

  const match = data?.results?.[0];

  if (!match) {
    throw new Error("City not found. Please check the spelling and try again.");
  }

  return {
    name: match.name,
    country: match.country,
    countryCode: match.country_code?.toUpperCase() || "",
    lat: match.latitude,
    lon: match.longitude,
  };
}

async function reverseGeocode(lat, lon) {
  try {
    const { data } = await weatherApi.get(REVERSE_GEO_URL, {
      params: {
        latitude: lat,
        longitude: lon,
        language: "en",
        format: "json",
      },
    });

    const match = data?.results?.[0];

    if (match) {
      return {
        name: match.name,
        country: match.country,
        countryCode: match.country_code?.toUpperCase() || "",
        lat,
        lon,
      };
    }
  } catch {
    // Fall back to coordinates if reverse geocoding fails.
  }

  return {
    name: "Your location",
    country: "",
    countryCode: "",
    lat,
    lon,
  };
}

/* Bundle Helper*/
async function getBundleByLocation(location) {
  const data = await fetchForecast(location.lat, location.lon);

  return {
    weather: mapCurrentWeather(data, location),
    forecast: mapForecast(data),
  };
}

/*Public Functions */
/* Fetch current weather for a city by name.*/
export async function getWeatherByCity(city) {
  try {
    const location = await geocodeCity(city);
    const bundle = await getBundleByLocation(location);

    return bundle.weather;
  } catch (error) {
    handleApiError(error);
  }
}

/* Fetch current weather using latitude and longitude.*/
export async function getWeatherByCoordinates(lat, lon) {
  try {
    const location = await reverseGeocode(lat, lon);

    const bundle = await getBundleByLocation({
      ...location,
      lat,
      lon,
    });

    return bundle.weather;
  } catch (error) {
    handleApiError(error);
  }
}
/*Fetch a 5-day forecast for a city.*/
export async function getForecastByCity(city) {
  try {
    const location = await geocodeCity(city);
    const bundle = await getBundleByLocation(location);

    return bundle.forecast;
  } catch (error) {
    handleApiError(error);
  }
}

/*Fetch a 5-day forecast using coordinates.*/
export async function getForecastByCoordinates(lat, lon) {
  try {
    const bundle = await getBundleByLocation({
      name: "Your location",
      country: "",
      countryCode: "",
      lat,
      lon,
    });

    return bundle.forecast;
  } catch (error) {
    handleApiError(error);
  }
}

/*Fetch current weather and 5-day forecast together by city.*/
export async function getWeatherAndForecastByCity(city) {
  try {
    const location = await geocodeCity(city);

    return await getBundleByLocation(location);
  } catch (error) {
    handleApiError(error);
  }
}

/* Fetch current weather and 5-day forecast together using coordinates. */
export async function getWeatherAndForecastByCoordinates(lat, lon) {
  try {
    const location = await reverseGeocode(lat, lon);

    return await getBundleByLocation({
      ...location,
      lat,
      lon,
    });
  } catch (error) {
    handleApiError(error);
  }
}
