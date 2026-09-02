import { getWeatherIconUrl, capitalizeWords, formatTime } from '../utils/weatherUtils';

export default function CurrentWeather({ data }) {
  const {
    name,
    sys,
    main,
    weather,
  } = data;

  const condition = capitalizeWords(weather[0].description);
  const iconUrl = getWeatherIconUrl(weather[0].icon);

  return (
    <section className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-xl sm:p-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold sm:text-4xl">{name}</h2>
          <p className="mt-1 text-blue-100">{sys.country}</p>
          <p className="mt-4 text-6xl font-light sm:text-7xl">
            {Math.round(main.temp)}°
            <span className="text-3xl">C</span>
          </p>
          <p className="mt-2 text-lg capitalize text-blue-100">{condition}</p>
          <p className="mt-1 text-sm text-blue-200">
            Feels like {Math.round(main.feels_like)}°C
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={iconUrl}
            alt={condition}
            className="h-28 w-28 drop-shadow-lg sm:h-32 sm:w-32"
          />
          <div className="mt-2 flex gap-4 text-xs text-blue-100">
            <span>🌅 {formatTime(sys.sunrise)}</span>
            <span>🌇 {formatTime(sys.sunset)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
