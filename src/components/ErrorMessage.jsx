import { HiOutlineExclamationCircle, HiOutlineX } from 'react-icons/hi';

export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm dark:border-red-800 dark:bg-red-900/30"
    >
      <HiOutlineExclamationCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
      <p className="flex-1 text-sm text-red-700 dark:text-red-300">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 rounded-lg p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-800/50"
          aria-label="Dismiss error"
        >
          <HiOutlineX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
