import React from "react";

const WinnerCard = ({ winner, developerA, developerB, aiAnalysis }) => {
  const nameA = developerA.profile.name || developerA.profile.username;
  const nameB = developerB.profile.name || developerB.profile.username;

  let winnerText = "It's a Draw!";
  let winnerAvatar = null;
  let subText = "Both developers are evenly matched.";

  if (winner === "developerA") {
    winnerText = `${nameA} Wins!`;
    winnerAvatar = developerA.profile.avatar;
    subText = `Calculated Developer Score: ${developerA.statistics.developerScore}/100`;
  } else if (winner === "developerB") {
    winnerText = `${nameB} Wins!`;
    winnerAvatar = developerB.profile.avatar;
    subText = `Calculated Developer Score: ${developerB.statistics.developerScore}/100`;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[var(--border)] rounded-2xl relative overflow-hidden group hover:border-[var(--accent)] transition-all duration-300 flex flex-col items-center text-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />
      
      {/* Crown Icon */}
      <span className="text-5xl animate-bounce">👑</span>

      {winnerAvatar && (
        <img
          src={winnerAvatar}
          alt="Winner Avatar"
          className="w-20 h-20 rounded-full border-4 border-yellow-500/80 object-cover mt-4 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
        />
      )}

      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent mt-4 font-sans tracking-tight">
        {winnerText}
      </h3>
      
      <p className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider mt-1">
        {subText}
      </p>

      {aiAnalysis?.winnerExplanation && (
        <div className="mt-6 pt-6 border-t border-[var(--border)] w-full text-left">
          <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
            <span>🤖</span> AI Winner Analysis
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
            {aiAnalysis.winnerExplanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default WinnerCard;