import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { WiDaySunny } from "react-icons/wi";
import SearchBar from "./SearchBar";

export default function Header({
  onSearch,
  onLocationClick,
  recentSearches,
  onRecentClick,
  onRemoveRecent,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <WiDaySunny className="text-4xl text-amber-400" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
              SkyCast
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your personal weather dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onLocationClick}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-600 hover:shadow-lg active:scale-95"
            aria-label="Use my location"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="hidden sm:inline">My Location</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="rounded-xl bg-slate-200 p-2.5 text-slate-700 shadow-md transition-all hover:bg-slate-300 active:scale-95 dark:bg-slate-700 dark:text-amber-300 dark:hover:bg-slate-600"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <HiOutlineSun className="h-5 w-5" />
            ) : (
              <HiOutlineMoon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <SearchBar onSearch={onSearch} />
      </div>

      {recentSearches.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Recent:
          </span>
          {recentSearches.map((city) => (
            <div
              key={city}
              className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-700/80 dark:text-slate-300"
            >
              <button
                onClick={() => onRecentClick(city)}
                className="transition-colors hover:text-blue-600 dark:hover:text-blue-300"
              >
                {city}
              </button>

              <button
                onClick={() => onRemoveRecent(city)}
                className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/40 dark:hover:text-red-400"
                aria-label={`Remove ${city} from recent searches`}
                title={`Remove ${city}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
