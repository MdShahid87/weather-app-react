import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a city (e.g. Delhi, Mumbai, Pune)"
        className="w-full rounded-xl border border-slate-200 bg-white/90 py-3 pl-4 pr-12 text-sm text-slate-800 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800/90 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-800"
        aria-label="Search for a city"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-blue-500 p-2 text-white transition-all hover:bg-blue-600 active:scale-95"
        aria-label="Search"
      >
        <HiOutlineSearch className="h-4 w-4" />
      </button>
    </form>
  );
}
