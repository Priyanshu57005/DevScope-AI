import React from "react";

const ActivityTimeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-10 p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl text-center">
        <p className="text-sm text-[var(--text-muted)] italic">No recent public activities found.</p>
      </div>
    );
  }

  // Slice to show maximum 8 recent events
  const recentEvents = events.slice(0, 8);

  const getEventMeta = (event) => {
    const time = new Date(event.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const repoName = event.repo?.name || "N/A";

    switch (event.type) {
      case "PushEvent":
        const commitMsg = event.payload?.commits?.[0]?.message || "Commit";
        const commitsLen = event.payload?.commits?.length || 0;
        return {
          icon: "🚀",
          color: "border-blue-500 text-blue-500",
          title: `Pushed ${commitsLen} commit${commitsLen > 1 ? "s" : ""} to ${repoName}`,
          description: commitMsg,
          time
        };
      case "PullRequestEvent":
        return {
          icon: "🔀",
          color: "border-purple-500 text-purple-500",
          title: `${event.payload?.action === "opened" ? "Opened" : "Closed"} Pull Request in ${repoName}`,
          description: event.payload?.pull_request?.title || "",
          time
        };
      case "IssuesEvent":
        return {
          icon: "🐛",
          color: "border-rose-500 text-rose-500",
          title: `${event.payload?.action === "opened" ? "Opened" : "Closed"} Issue in ${repoName}`,
          description: event.payload?.issue?.title || "",
          time
        };
      case "WatchEvent":
        return {
          icon: "⭐",
          color: "border-amber-500 text-amber-500",
          title: `Starred repository ${repoName}`,
          description: "",
          time
        };
      case "CreateEvent":
        return {
          icon: "🌱",
          color: "border-emerald-500 text-emerald-500",
          title: `Created ${event.payload?.ref_type || "repository"} in ${repoName}`,
          description: event.payload?.description || "",
          time
        };
      case "ForkEvent":
        return {
          icon: "🍴",
          color: "border-teal-500 text-teal-500",
          title: `Forked ${repoName}`,
          description: "",
          time
        };
      case "ReleaseEvent":
        return {
          icon: "📦",
          color: "border-indigo-500 text-indigo-500",
          title: `Published release in ${repoName}`,
          description: event.payload?.release?.name || event.payload?.release?.tag_name || "",
          time
        };
      default:
        return {
          icon: "⚡",
          color: "border-gray-500 text-gray-500",
          title: `Performed ${event.type.replace("Event", "")} action in ${repoName}`,
          description: "",
          time
        };
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-[var(--text-primary)]">
          Recent Activity Timeline
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      </div>

      <div className="relative pl-6 border-l border-[var(--border)] ml-3 space-y-6 py-2">
        {recentEvents.map((event, index) => {
          const meta = getEventMeta(event);
          return (
            <div key={event.id || index} className="relative group">
              {/* Event bullet point */}
              <div className={`absolute -left-[35px] top-0.5 w-7 h-7 rounded-full bg-[var(--bg-card)] border-2 ${meta.color} flex items-center justify-center text-xs shadow-md z-10 group-hover:scale-110 transition-transform duration-200`}>
                {meta.icon}
              </div>

              <div className="p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--border-glow)] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-tight">
                    {meta.title}
                  </h4>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono flex-shrink-0">
                    {meta.time}
                  </span>
                </div>
                {meta.description && (
                  <p className="text-xs text-[var(--text-secondary)] italic mt-2 border-l-2 border-[var(--border)] pl-2">
                    {meta.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;