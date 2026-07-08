const StatBadge = ({ label, value, icon }) => (
  <div className="flex flex-col items-center gap-1 px-4 py-3 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200 group">
    <span className="text-lg">{icon}</span>
    <span className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-soft)] transition-colors duration-200">
      {value?.toLocaleString() ?? "—"}
    </span>
    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-medium">
      {label}
    </span>
  </div>
);

const UserCard = ({ user }) => {
  const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 animate-fade-in">
      <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--border-glow)] transition-all duration-500 hover:shadow-[0_0_40px_#388bfd15]">
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-secondary)] to-[var(--accent)]" />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] rounded-full opacity-50 blur-sm" />
              <img
                src={user.avatar_url}
                alt={user.login}
                className="relative w-24 h-24 rounded-full border-2 border-[var(--border)] object-cover"
              />
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-[var(--accent-secondary)] rounded-full border-2 border-[var(--bg-card)]" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
                  {user.name || user.login}
                </h2>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent-soft)] text-sm hover:text-[var(--accent)] transition-colors duration-200 group/link"
                  style={{ fontFamily: "Space Mono, monospace" }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  @{user.login}
                  <span className="opacity-0 group-hover/link:opacity-100 transition-opacity duration-200">
                    ↗
                  </span>
                </a>
              </div>

              {user.bio && (
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md">
                  {user.bio}
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[var(--text-muted)]">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <span>📍</span> {user.location}
                  </span>
                )}
                {user.company && (
                  <span className="flex items-center gap-1">
                    <span>🏢</span> {user.company}
                  </span>
                )}
                {user.blog && (
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-[var(--accent-soft)] transition-colors"
                  >
                    <span>🔗</span> {user.blog}
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <span>📅</span> Joined {joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <StatBadge label="Repositories" value={user.public_repos} icon="📦" />
            <StatBadge label="Followers" value={user.followers} icon="👥" />
            <StatBadge label="Following" value={user.following} icon="✨" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
