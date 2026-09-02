import ForecastCard from "./ForecastCard";

export default function Forecast({ forecast }) {
  if (!forecast.length) return null;

  return (
    <section>
      <h3 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 sm:gap-4">
        {forecast.map((day) => (
          <ForecastCard key={day.date} day={day} />
        ))}
      </div>
    </section>
  );
}
