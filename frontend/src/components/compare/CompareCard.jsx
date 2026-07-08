import React from "react";

const CompareCard = ({ developerA, developerB }) => {
  const profileA = developerA.profile;
  const profileB = developerB.profile;

  const RenderShortCard = ({ profile, label }) => {
    return (
      <div className="flex-1 p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl flex flex-col items-center text-center relative hover:border-[var(--accent)] transition-all duration-300">
        <div className="absolute top-3 left-4 px-2 py-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-[9px] uppercase tracking-wider font-mono text-[var(--text-muted)]">
          {label}
        </div>
        <img
          src={profile.avatar}
          alt={profile.username}
          className="w-16 h-16 rounded-full border-2 border-[var(--border)] object-cover mt-2"
        />
        <h3 className="text-lg font-bold text-[var(--text-primary)] mt-3 leading-tight">
          {profile.name || profile.username}
        </h3>
        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--accent-soft)] hover:text-[var(--accent)] font-mono mt-1"
        >
          @{profile.username}
        </a>
        <p className="text-xs text-[var(--text-secondary)] mt-2 line-clamp-2 min-h-[2rem] max-w-xs px-2 leading-relaxed">
          {profile.bio || "No bio description set"}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-6 animate-fade-in">
      <RenderShortCard profile={profileA} label="Developer A" />
      <RenderShortCard profile={profileB} label="Developer B" />
    </div>
  );
};

export default CompareCard;