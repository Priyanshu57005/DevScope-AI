import React from "react";

const AIScoreCard = ({ aiAnalysis }) => {
  if (!aiAnalysis || !aiAnalysis.careerAdvice) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl relative overflow-hidden group hover:border-[var(--accent)] transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--accent)]" />
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">AI Career Guidance</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
        {aiAnalysis.careerAdvice}
      </p>
    </div>
  );
};

export default AIScoreCard;