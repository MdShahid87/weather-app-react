const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-gray-200/70 bg-white/60 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/40">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              SkyCast Weather App
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              © {currentYear} SkyCast. All rights reserved.
            </p>
          </div>
          {/* Links & Attribution */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500 dark:text-gray-400">
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-white dark:focus:ring-offset-gray-950"
            >
              Weather data by Open-Meteo
            </a>

            <span
              className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block dark:bg-gray-600"
              aria-hidden="true"
            />

            <a
              href="https://github.com/MdShahid87/weather-app-react"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:text-white dark:focus:ring-offset-gray-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.604-3.369-1.34-3.369-1.34-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.579.688.481A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>

              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-4 text-center text-[11px] text-gray-400 dark:text-gray-500">
          Built with React & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
