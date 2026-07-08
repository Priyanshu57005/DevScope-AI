const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fade-in">
      {/* Ghost illustration */}
      <div className="relative">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-80"
        >
          {/* Glow */}
          <circle cx="60" cy="55" r="40" fill="#f8514910" />
          {/* Ghost body */}
          <path
            d="M30 55C30 37.33 43.43 23 60 23C76.57 23 90 37.33 90 55V90L80 82L70 90L60 82L50 90L40 82L30 90V55Z"
            fill="#161b22"
            stroke="#f85149"
            strokeWidth="2"
          />
          {/* Eyes */}
          <circle cx="48" cy="55" r="6" fill="#f85149" />
          <circle cx="72" cy="55" r="6" fill="#f85149" />
          <circle cx="50" cy="53" r="2" fill="#0a0c10" />
          <circle cx="74" cy="53" r="2" fill="#0a0c10" />
          {/* Mouth */}
          <path
            d="M50 68Q60 74 70 68"
            stroke="#f85149"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* X mark above */}
          <text x="50" y="18" fontSize="20" fill="#f8514980" textAnchor="middle">
            404
          </text>
        </svg>
        {/* Floating animation wrapper */}
        <div className="absolute -inset-4 rounded-full border border-[#f8514920] animate-ping opacity-30" />
      </div>

      <div className="text-center space-y-2">
        <h3
          className="text-xl font-bold text-[var(--danger)]"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          {message || "User not found"}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm max-w-xs">
          The GitHub user you're looking for doesn't seem to exist. Double-check
          the username and try again.
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
