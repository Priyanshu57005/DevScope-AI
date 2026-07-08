/**
 * Calculates a developer score out of 100 based on profile and repository stats.
 * @param {Object} profile - Formatted GitHub user profile
 * @param {Object} stats - Calculated statistics
 * @returns {Object} { score, breakdown }
 */
const calculateDeveloperScore = (profile, stats) => {
  const followers = profile.followers || 0;
  const publicRepos = profile.publicRepos || 0;
  
  // 1. Reputation (30%): followers & public repos counts
  // We use a logarithmic scaling for followers to be fair to normal developers while rewarding large accounts
  const followersScore = followers > 0 ? Math.min(20, Math.log10(followers) * 8) : 0;
  const repoCountScore = Math.min(10, (publicRepos / 50) * 10);
  const reputationScore = Math.round(followersScore + repoCountScore);

  // 2. Code Impact (40%): stars & forks
  const totalStars = stats.totalStars || 0;
  const totalForks = stats.totalForks || 0;
  const starsScore = totalStars > 0 ? Math.min(25, Math.log10(totalStars + 1) * 10) : 0;
  const forksScore = totalForks > 0 ? Math.min(15, Math.log10(totalForks + 1) * 7.5) : 0;
  const impactScore = Math.round(starsScore + forksScore);

  // 3. Repository Quality (15%): quality average from stats
  const repoQualityScore = Math.round(((stats.repositoryQuality || 0) / 100) * 15);

  // 4. Activity (15%): activity score from stats
  const activityScore = Math.round(((stats.activityScore || 0) / 100) * 15);

  const totalScore = Math.min(100, reputationScore + impactScore + repoQualityScore + activityScore);

  return {
    score: totalScore,
    breakdown: {
      reputation: reputationScore,
      impact: impactScore,
      quality: repoQualityScore,
      activity: activityScore
    }
  };
};

module.exports = {
  calculateDeveloperScore
};