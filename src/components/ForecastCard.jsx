import { getWeatherIconUrl, formatDate } from "../utils/weatherUtils";

export default function ForecastCard({ day }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-4 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {formatDate(day.date + "T12:00:00")}
      </p>
      <img
        src={getWeatherIconUrl(day.icon)}
        alt={day.condition}
        className="my-2 h-14 w-14"
      />
      <p className="text-center text-xs capitalize text-slate-600 dark:text-slate-300">
        {day.condition}
      </p>
      <div className="mt-2 flex gap-2 text-sm font-semibold">
        <span className="text-slate-800 dark:text-white">{day.maxTemp}°</span>
        <span className="text-slate-400">{day.minTemp}°</span>
      </div>
    </div>
  );
}
