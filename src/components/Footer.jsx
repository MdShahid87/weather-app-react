import { FaGithub } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200 pt-6 dark:border-slate-700">
      <div className="flex flex-col items-center gap-3 text-center text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between">
        <p>© {currentYear} SkyCast Weather App</p>

        <p>
          Weather data by{" "}
          <a
            href="https://open-meteo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-500 hover:underline"
          >
            Open-Meteo
          </a>
        </p>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300 dark:hover:text-blue-400"
        >
          <FaGithub className="h-4 w-4" />
          View on GitHub
        </a>
      </div>
    </footer>
  );
}
