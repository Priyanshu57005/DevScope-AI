import React from "react";

const SuggestionCards = ({ suggestions }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="w-full p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl relative overflow-hidden hover:border-amber-500/50 transition-all duration-300">
      <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5">
        <span>💡</span> Actionable Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((sug, idx) => (
          <div key={idx} className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
            <span className="text-amber-500 font-bold block mb-1">Recommendation {idx + 1}</span>
            {sug}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCards;