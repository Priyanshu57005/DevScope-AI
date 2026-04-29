const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[var(--border)] border-t-[var(--accent)] animate-spin" />
        {/* Inner ring */}
        <div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-[var(--accent-secondary)] animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "0.6s" }}
        />
        {/* Center dot */}
        <div className="absolute inset-[22px] rounded-full bg-[var(--accent)] opacity-80 animate-pulse" />
      </div>
      <div className="flex gap-1 items-center">
        <span
          className="text-sm font-mono text-[var(--text-secondary)] tracking-widest animate-pulse"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          FETCHING
        </span>
        <span className="flex gap-1 ml-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-[var(--accent)] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default Loader;
