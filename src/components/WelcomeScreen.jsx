import { WiDaySunny, WiCloudy } from "react-icons/wi";

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <WiDaySunny className="h-20 w-20 text-amber-400" />
        <WiCloudy className="absolute -bottom-2 -right-4 h-12 w-12 text-slate-300 dark:text-slate-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Welcome to SkyCast
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
        Search for a city or use your current location to see real-time weather
        conditions and a 5-day forecast.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Delhi", "Mumbai", "Kolkata", "Bihar"].map((city) => (
          <span
            key={city}
            className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-700/80 dark:text-slate-400"
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  );
}
