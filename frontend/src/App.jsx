import { useState } from "react";
import "./styles/global.css";
import SearchPage from "./pages/Search";
import ComparePage from "./pages/Compare";

const Header = ({ page, setPage }) => (
  <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3 justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shadow-[0_0_12px_var(--accent-glow)] flex-shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </div>

        <div className="flex items-baseline gap-2">
          <span
            className="text-[var(--text-primary)] font-bold text-base tracking-tight leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            DevScope
          </span>
          <span
            className="text-[var(--accent-soft)] font-bold text-base tracking-tight leading-none"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            AI
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border border-[var(--border)] bg-[var(--bg-card)] p-1 rounded-xl">
        <button
          onClick={() => setPage("search")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${page === "search" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
        >
          Search
        </button>
        <button
          onClick={() => setPage("compare")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans transition-all duration-200 ${page === "compare" ? "bg-[var(--accent)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
        >
          Compare
        </button>
      </div>

      {/* Nav accent badge */}
      <div
        className="hidden md:flex items-center gap-1.5 text-xs text-[var(--text-muted)] px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] font-mono"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)] animate-pulse" />
        DevScope AI API
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t border-[var(--border)] py-6 text-center">
    <p
      className="text-xs text-[var(--text-muted)]"
      style={{ fontFamily: "Space Mono, monospace" }}
    >
      Built with ❤️ using{" "}
      <span className="text-[var(--accent-soft)]">React</span> +{" "}
      <span className="text-[var(--accent-soft)]">Tailwind</span> ·{" "}
      <a href="https://priyanshu-portf.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">
        <span className="text-[var(--accent-soft)]">By Priyanshu😉❤️ </span>{" "}
      </a>
      {" "}
      <a
        href="https://docs.github.com/en/rest"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[var(--accent-soft)] hover:text-[var(--accent)] transition-colors ml-1"
      >
        GitHub REST API
      </a>
    </p>
  </footer>
);

export default function App() {
  const [page, setPage] = useState("search");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Header page={page} setPage={setPage} />
      {page === "search" ? <SearchPage /> : <ComparePage />}
      <Footer />
    </div>
  );
}
