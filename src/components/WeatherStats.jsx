import {
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiHorizonAlt,
} from "react-icons/wi";
import { metersToKm, getWindDirection } from "../utils/weatherUtils";

const statConfig = [
  {
    key: "humidity",
    label: "Humidity",
    icon: WiHumidity,
    getValue: (data) => `${data.main.humidity}%`,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/30",
  },
  {
    key: "wind",
    label: "Wind Speed",
    icon: WiStrongWind,
    getValue: (data) =>
      `${data.wind.speed} m/s ${getWindDirection(data.wind.deg)}`,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  {
    key: "pressure",
    label: "Pressure",
    icon: WiBarometer,
    getValue: (data) => `${data.main.pressure} hPa`,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-900/30",
  },
  {
    key: "visibility",
    label: "Visibility",
    icon: WiHorizonAlt,
    getValue: (data) => `${metersToKm(data.visibility)} km`,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/30",
  },
];

export default function WeatherStats({ data }) {
  return (
    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {statConfig.map(({ key, label, icon: Icon, getValue, color, bg }) => (
        <div
          key={key}
          className="rounded-xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:bg-slate-800"
        >
          <div className={`mb-3 inline-flex rounded-lg p-2 ${bg}`}>
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
            {getValue(data)}
          </p>
        </div>
      ))}
    </section>
  );
}
