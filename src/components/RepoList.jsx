const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Vue: "#41b883",
};

const RepoCard = ({ repo, index }) => {
  const langColor = languageColors[repo.language] || "#8b949e";

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 p-5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] hover:bg-[var(--bg-card-hover)] hover:shadow-[0_0_20px_#388bfd12] transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Repo name */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[var(--text-muted)] flex-shrink-0 group-hover:text-[var(--accent)] transition-colors duration-200"
          >
            <path d="M3 6c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v12c0 1.1-.9 2-2 2H5a2 2 0 0 1-2-2V6z" />
            <path d="M3 8h18" />
          </svg>
          <h3
            className="font-semibold text-sm text-[var(--accent-soft)] group-hover:text-[var(--accent)] transition-colors duration-200 truncate"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            {repo.name}
          </h3>
        </div>
        <span className="flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-secondary)]">
          {repo.private ? "private" : "public"}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
        {repo.description || (
          <span className="italic text-[var(--text-muted)]">No description</span>
        )}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-auto pt-2 border-t border-[var(--border)]">
        {/* Language */}
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}

        {/* Stars */}
        <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] ml-auto">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={repo.stargazers_count > 0 ? "var(--star)" : "none"}
            stroke={repo.stargazers_count > 0 ? "var(--star)" : "currentColor"}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{ color: repo.stargazers_count > 0 ? "var(--star)" : undefined }}>
            {repo.stargazers_count.toLocaleString()}
          </span>
        </span>

        {/* Forks */}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="18" r="3" />
              <circle cx="6" cy="6" r="3" />
              <circle cx="18" cy="6" r="3" />
              <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
              <line x1="12" y1="12" x2="12" y2="15" />
            </svg>
            {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  );
};

const RepoList = ({ repos }) => {
  if (!repos?.length) return null;

  const sorted = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 mb-16 animate-fade-in">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Repositories
        </h2>
        <span className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent-glow)] text-[var(--accent-soft)] border border-[var(--accent)]20 font-mono">
          {repos.length}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sorted.map((repo, i) => (
          <RepoCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
