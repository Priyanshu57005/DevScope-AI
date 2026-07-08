import React from "react";

const StatMetric = ({ label, value, icon, description }) => (
  <div className="flex flex-col gap-1 p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-all duration-300">
    <div className="flex items-center gap-2">
      <span className="text-xl">{icon}</span>
      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold font-mono">{label}</span>
    </div>
    <span className="text-2xl font-extrabold text-[var(--text-primary)] mt-1">{value}</span>
    {description && <span className="text-[10px] text-[var(--text-muted)] mt-1">{description}</span>}
  </div>
);

const ProgressBar = ({ label, value, colorClass }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-xs">
      <span className="text-[var(--text-secondary)] font-medium">{label}</span>
      <span className="text-[var(--text-primary)] font-bold">{value}%</span>
    </div>
    <div className="h-2 w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const StatisticsCard = ({ statistics, profile }) => {
  if (!statistics) return null;

  const score = statistics.developerScore || 0;
  const breakdown = statistics.developerScoreBreakdown || { reputation: 0, impact: 0, quality: 0, activity: 0 };
  const age = statistics.repositoryAge || { averageAgeInMonths: 0, oldestAgeInMonths: 0, newestAgeInMonths: 0 };

  // Determine score color
  let scoreColor = "from-emerald-500 to-teal-400";
  let scoreGlow = "shadow-emerald-500/20";
  if (score < 40) {
    scoreColor = "from-rose-500 to-orange-400";
    scoreGlow = "shadow-rose-500/20";
  } else if (score < 70) {
    scoreColor = "from-amber-500 to-yellow-400";
    scoreGlow = "shadow-amber-500/20";
  }

  // Format repo sizes (in KB to MB)
  const formatSize = (kb) => {
    if (kb > 1024 * 1024) return `${(kb / (1024 * 1024)).toFixed(1)} GB`;
    if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
    return `${kb} KB`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 space-y-8 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Developer Analytics
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Developer Score Circle Gauge */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl relative overflow-hidden group hover:border-[var(--accent)] transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]" />
          
          <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold font-mono mb-4">
            Developer Score
          </span>

          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Radial Ring SVG */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke="var(--border)" 
                strokeWidth="6" 
                fill="transparent" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="42" 
                stroke="url(#scoreGrad)" 
                strokeWidth="8" 
                fill="transparent" 
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="text-blue-500" stopColor="#388bfd" />
                  <stop offset="100%" className="text-purple-500" stopColor="#8a3ffd" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-[var(--text-primary)] font-mono">{score}</span>
              <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest">Grade</span>
            </div>
          </div>

          <span className="text-xs font-semibold text-[var(--text-secondary)] mt-4">
            {score >= 80 ? "🏆 Elite Contributor" : score >= 60 ? "⭐ Strong Developer" : score >= 40 ? "📈 Budding Engineer" : "🌱 Explorer"}
          </span>
        </div>

        {/* Scoring Breakdown & Indicators */}
        <div className="md:col-span-2 p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl space-y-4 hover:border-[var(--accent)] transition-all duration-300">
          <h3 className="text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-2 font-mono uppercase tracking-wider">
            Score Breakdown
          </h3>
          <div className="space-y-3.5">
            <ProgressBar 
              label="Reputation (Followers & Repos)" 
              value={Math.round((breakdown.reputation / 30) * 100)} 
              colorClass="bg-blue-500" 
            />
            <ProgressBar 
              label="Code Impact (Stars & Forks)" 
              value={Math.round((breakdown.impact / 40) * 100)} 
              colorClass="bg-purple-500" 
            />
            <ProgressBar 
              label="Repository Quality (Descriptions & Specs)" 
              value={Math.round((breakdown.quality / 15) * 100)} 
              colorClass="bg-emerald-500" 
            />
            <ProgressBar 
              label="Activity Ratio (Recent Commit Events)" 
              value={Math.round((breakdown.activity / 15) * 100)} 
              colorClass="bg-amber-500" 
            />
          </div>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatMetric 
          label="Avg Stars" 
          value={statistics.averageStars} 
          icon="⭐" 
          description="Average stargazers per repository"
        />
        <StatMetric 
          label="Avg Forks" 
          value={statistics.averageForks} 
          icon="🍴" 
          description="Average forks per repository"
        />
        <StatMetric 
          label="Repo Quality" 
          value={`${statistics.repositoryQuality}%`} 
          icon="🛡️" 
          description="Documentation & size health score"
        />
        <StatMetric 
          label="Tech Diversity" 
          value={`${statistics.technologyDiversity}%`} 
          icon="🌈" 
          description="Usage spread across languages"
        />
      </div>

      {/* Profile & Code Age Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Repo details */}
        <div className="p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-[var(--text-muted)] font-mono uppercase tracking-wider">
            Codebase Volume & Languages
          </h4>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-[10px] uppercase text-[var(--text-muted)] font-mono">Total Watchers</span>
              <p className="text-lg font-extrabold text-[var(--text-primary)]">{(statistics.totalWatchers || 0).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--text-muted)] font-mono">Total Size</span>
              <p className="text-lg font-extrabold text-[var(--text-primary)]">{formatSize(statistics.totalSize || 0)}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--text-muted)] font-mono">Primary Language</span>
              <p className="text-lg font-extrabold text-[var(--accent-soft)]">{statistics.mostUsedLanguage}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[var(--text-muted)] font-mono">Languages Count</span>
              <p className="text-lg font-extrabold text-[var(--text-primary)]">{Object.keys(statistics.languageDistribution || {}).length}</p>
            </div>
          </div>
        </div>

        {/* Repository Age */}
        <div className="p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl space-y-3">
          <h4 className="text-xs font-bold text-[var(--text-muted)] font-mono uppercase tracking-wider">
            Repository Age Timeline
          </h4>
          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
            <div className="p-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <span className="text-[9px] uppercase text-[var(--text-muted)] font-mono block">Newest Repo</span>
              <p className="text-base font-extrabold text-[var(--text-primary)] mt-1">{age.newestAgeInMonths}m</p>
              <span className="text-[8px] text-[var(--text-muted)] block mt-0.5">since creation</span>
            </div>
            <div className="p-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <span className="text-[9px] uppercase text-[var(--text-muted)] font-mono block">Average Age</span>
              <p className="text-base font-extrabold text-[var(--accent-soft)] mt-1">{age.averageAgeInMonths}m</p>
              <span className="text-[8px] text-[var(--text-muted)] block mt-0.5">across repos</span>
            </div>
            <div className="p-2 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <span className="text-[9px] uppercase text-[var(--text-muted)] font-mono block">Oldest Repo</span>
              <p className="text-base font-extrabold text-[var(--text-primary)] mt-1">{age.oldestAgeInMonths}m</p>
              <span className="text-[8px] text-[var(--text-muted)] block mt-0.5">since creation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;