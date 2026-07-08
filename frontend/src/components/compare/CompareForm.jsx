import React, { useState } from "react";

const CompareForm = ({ onCompare, isLoading }) => {
  const [devA, setDevA] = useState("");
  const [devB, setDevB] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (devA.trim() && devB.trim()) {
      onCompare(devA.trim(), devB.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl relative overflow-hidden group hover:border-[var(--border-glow)] transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Developer A Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">Developer A</label>
          <input
            type="text"
            value={devA}
            onChange={(e) => setDevA(e.target.value)}
            placeholder="Username (e.g. torvalds)"
            disabled={isLoading}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors text-sm font-medium"
          />
        </div>

        {/* Developer B Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">Developer B</label>
          <input
            type="text"
            value={devB}
            onChange={(e) => setDevB(e.target.value)}
            placeholder="Username (e.g. gaearon)"
            disabled={isLoading}
            className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] transition-colors text-sm font-medium"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !devA.trim() || !devB.trim()}
        className="w-full mt-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-soft)] text-white font-bold text-sm rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_20px_var(--accent-glow)] active:scale-95 text-center block"
      >
        {isLoading ? "Comparing Profiles..." : "Compare Developers"}
      </button>
    </form>
  );
};

export default CompareForm;