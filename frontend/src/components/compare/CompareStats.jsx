import React from "react";

const CompareRow = ({ label, comparisonData, nameA, nameB }) => {
  if (!comparisonData) return null;
  const { devAValue, devBValue, winner } = comparisonData;
  
  // Calculate relative widths
  const maxVal = Math.max(devAValue, devBValue, 1);
  const widthA = `${(devAValue / maxVal) * 100}%`;
  const widthB = `${(devBValue / maxVal) * 100}%`;
  
  return (
    <div className="p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl space-y-2 hover:border-[var(--accent)] transition-all duration-300">
      {/* Label header */}
      <div className="flex justify-between items-center text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
        <span>{nameA}</span>
        <span className="font-bold text-[var(--text-primary)] text-xs uppercase tracking-widest">{label}</span>
        <span>{nameB}</span>
      </div>
      
      {/* Split Bars */}
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Dev A side (aligned right) */}
        <div className="flex items-center gap-3 justify-end">
          <span className={`text-sm font-extrabold ${winner === "developerA" ? "text-emerald-400" : "text-[var(--text-secondary)]"}`}>
            {devAValue.toLocaleString()}
          </span>
          <div className="h-2 w-full max-w-[150px] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full overflow-hidden flex justify-end">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${winner === "developerA" ? "bg-emerald-500" : "bg-gray-600"}`}
              style={{ width: widthA }}
            />
          </div>
        </div>
        
        {/* Dev B side (aligned left) */}
        <div className="flex items-center gap-3 justify-start">
          <div className="h-2 w-full max-w-[150px] bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${winner === "developerB" ? "bg-emerald-500" : "bg-gray-600"}`}
              style={{ width: widthB }}
            />
          </div>
          <span className={`text-sm font-extrabold ${winner === "developerB" ? "text-emerald-400" : "text-[var(--text-secondary)]"}`}>
            {devBValue.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const CompareStats = ({ comparison, developerA, developerB }) => {
  if (!comparison) return null;

  const nameA = developerA.profile.name || developerA.profile.username;
  const nameB = developerB.profile.name || developerB.profile.username;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)] font-sans">
          Metric Comparison
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>

      <div className="space-y-4">
        <CompareRow 
          label="Developer Score" 
          comparisonData={comparison.developerScore} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Total Stars" 
          comparisonData={comparison.totalStars} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Total Forks" 
          comparisonData={comparison.totalForks} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Followers" 
          comparisonData={comparison.followers} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Public Repos" 
          comparisonData={comparison.publicRepos} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Recent Activity Score" 
          comparisonData={comparison.activityScore} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Repo Quality Score" 
          comparisonData={comparison.repositoryQuality} 
          nameA={nameA} 
          nameB={nameB} 
        />
        <CompareRow 
          label="Tech Diversity Score" 
          comparisonData={comparison.technologyDiversity} 
          nameA={nameA} 
          nameB={nameB} 
        />
      </div>
    </div>
  );
};

export default CompareStats;