const githubService = require("./github.service");
const cacheService = require("./cache.service");
const aiService = require("./ai.service");

const {
    formatProfile,
    formatRepositories,
} = require("../utils/githubHelpers");

const statsService = require("./stats.service");

const getProfile = async (username) => {
  try {
    // Check if profile is cached
    const cached = await cacheService.getCachedProfile(username);
    if (cached) {
      return {
        profile: cached.profile,
        repositories: cached.repositories,
        events: cached.events,
        statistics: cached.statistics,
        aiAnalysis: cached.aiAnalysis || null,
        cached: true,
      };
    }

    // Fetch fresh data from GitHub (parallel requests)
    const [profile, repositories, events] = await Promise.all([
      githubService.getUserProfile(username),
      githubService.getUserRepositories(username),
      githubService.getUserEvents(username),
    ]);

    // Format GitHub data
    const formattedProfile = formatProfile(profile);
    const formattedRepositories = formatRepositories(repositories);

    // Calculate statistics (with events for activity score)
    const statistics = statsService.calculateStatistics(
      formattedProfile,
      formattedRepositories,
      events
    );

    // Generate AI analysis
    const aiAnalysis = await aiService.generateProfileAnalysis(
      formattedProfile,
      statistics
    );

    // Cache the profile
    await cacheService.cacheProfile(
      username,
      formattedProfile,
      formattedRepositories,
      events,
      statistics,
      aiAnalysis
    );

    return {
      profile: formattedProfile,
      repositories: formattedRepositories,
      events,
      statistics,
      aiAnalysis,
      cached: false,
    };
  } catch (error) {
    throw new Error(`Failed to fetch profile for ${username}: ${error.message}`);
  }
};

module.exports = {
    getProfile,
};