import { useState } from "react";

const SearchBar = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        {/* Glow border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] rounded-xl opacity-0 group-focus-within:opacity-30 transition-opacity duration-500 blur-sm" />

        <div className="relative flex items-center bg-[var(--bg-card)] border border-[var(--border)] group-focus-within:border-[var(--accent)] rounded-xl transition-all duration-300 overflow-hidden">
          {/* Search icon */}
          <div className="pl-5 pr-3 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search a GitHub username..."
            disabled={isLoading}
            className="flex-1 bg-transparent py-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base outline-none font-medium disabled:opacity-50"
            style={{ fontFamily: "Syne, sans-serif" }}
          />

          {/* Search button */}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="relative m-2 px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-soft)] text-white font-semibold text-sm rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_var(--accent-glow)] active:scale-95 overflow-hidden group/btn"
          >
            <span className="relative z-10">
              {isLoading ? "Searching..." : "Search"}
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </button>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-center text-xs text-[var(--text-muted)] mt-3 tracking-wide">
        Enter any GitHub username to explore their profile & repositories
      </p>
    </form>
  );
};

export default SearchBar;
