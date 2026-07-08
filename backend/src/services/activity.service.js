const githubService = require("./github.service");
const cacheService = require("./cache.service");

const getActivityAnalysis = async (username) => {
  try {
    let events = [];
    
    // Check if we have cached profile events
    const cached = await cacheService.getCachedProfile(username);
    if (cached && cached.events) {
      events = cached.events;
    } else {
      // Fetch fresh events
      events = await githubService.getUserEvents(username);
    }

    const eventsList = Array.isArray(events) ? events : [];

    const pushes = [];
    const pullRequests = [];
    const issues = [];
    const releases = [];

    eventsList.forEach(event => {
      const repoName = event.repo ? event.repo.name : "N/A";
      const timestamp = event.created_at;

      if (event.type === "PushEvent") {
        pushes.push({
          repo: repoName,
          commitsCount: event.payload?.commits ? event.payload.commits.length : 0,
          commits: event.payload?.commits ? event.payload.commits.map(c => c.message) : [],
          timestamp
        });
      } else if (event.type === "PullRequestEvent") {
        pullRequests.push({
          repo: repoName,
          action: event.payload?.action || "opened",
          title: event.payload?.pull_request ? event.payload.pull_request.title : "N/A",
          number: event.payload?.pull_request ? event.payload.pull_request.number : 0,
          url: event.payload?.pull_request ? event.payload.pull_request.html_url : "#",
          timestamp
        });
      } else if (event.type === "IssuesEvent") {
        issues.push({
          repo: repoName,
          action: event.payload?.action || "opened",
          title: event.payload?.issue ? event.payload.issue.title : "N/A",
          number: event.payload?.issue ? event.payload.issue.number : 0,
          url: event.payload?.issue ? event.payload.issue.html_url : "#",
          timestamp
        });
      } else if (event.type === "ReleaseEvent") {
        releases.push({
          repo: repoName,
          action: event.payload?.action || "published",
          name: event.payload?.release ? (event.payload.release.name || event.payload.release.tag_name) : "N/A",
          url: event.payload?.release ? event.payload.release.html_url : "#",
          timestamp
        });
      }
    });

    return {
      pushes,
      pullRequests,
      issues,
      releases,
      totalEventsAnalyzed: eventsList.length
    };
  } catch (error) {
    throw new Error(`Failed to analyze activity: ${error.message}`);
  }
};

module.exports = {
  getActivityAnalysis
};