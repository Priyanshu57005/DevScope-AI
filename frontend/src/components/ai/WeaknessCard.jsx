import React from "react";

const WeaknessCard = ({ weaknesses }) => {
  if (!weaknesses || weaknesses.length === 0) return null;

  return (
    <div className="flex-1 p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl relative overflow-hidden hover:border-rose-500/50 transition-all duration-300">
      <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono mb-4 flex items-center gap-1.5">
        <span>⚠️</span> Gaps & Weaknesses
      </h3>
      <ul className="space-y-3">
        {weaknesses.map((weak, idx) => (
          <li key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] font-medium">
            <span className="text-rose-500 font-bold">⚠</span>
            <span>{weak}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeaknessCard;