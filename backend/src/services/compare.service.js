const profileService = require("./profile.service");
const aiService = require("./ai.service");

const compareDevelopers = async (usernameA, usernameB) => {
  try {
    // Parallel fetching
    const [devAData, devBData] = await Promise.all([
      profileService.getProfile(usernameA),
      profileService.getProfile(usernameB)
    ]);

    const statsA = devAData.statistics;
    const statsB = devBData.statistics;
    const profileA = devAData.profile;
    const profileB = devBData.profile;

    const compareMetric = (valA, valB) => {
      const diff = Math.abs(valA - valB);
      let winner = "draw";
      if (valA > valB) {
        winner = "developerA";
      } else if (valB > valA) {
        winner = "developerB";
      }
      return { devAValue: valA, devBValue: valB, winner, diff };
    };

    const comparison = {
      developerScore: compareMetric(statsA.developerScore, statsB.developerScore),
      followers: compareMetric(profileA.followers || 0, profileB.followers || 0),
      publicRepos: compareMetric(profileA.publicRepos || 0, profileB.publicRepos || 0),
      totalStars: compareMetric(statsA.totalStars || 0, statsB.totalStars || 0),
      totalForks: compareMetric(statsA.totalForks || 0, statsB.totalForks || 0),
      activityScore: compareMetric(statsA.activityScore || 0, statsB.activityScore || 0),
      repositoryQuality: compareMetric(statsA.repositoryQuality || 0, statsB.repositoryQuality || 0),
      technologyDiversity: compareMetric(statsA.technologyDiversity || 0, statsB.technologyDiversity || 0)
    };

    // Determine overall winner
    let overallWinner = "draw";
    if (statsA.developerScore > statsB.developerScore) {
      overallWinner = "developerA";
    } else if (statsB.developerScore > statsA.developerScore) {
      overallWinner = "developerB";
    } else {
      // Tie breakers
      if ((profileA.followers || 0) > (profileB.followers || 0)) {
        overallWinner = "developerA";
      } else if ((profileB.followers || 0) > (profileA.followers || 0)) {
        overallWinner = "developerB";
      } else {
        if (statsA.totalStars > statsB.totalStars) {
          overallWinner = "developerA";
        } else if (statsB.totalStars > statsA.totalStars) {
          overallWinner = "developerB";
        }
      }
    }

    // Generate AI explanation
    const aiAnalysis = await aiService.generateComparisonAnalysis(
      { profile: profileA, statistics: statsA },
      { profile: profileB, statistics: statsB },
      comparison,
      overallWinner
    );

    return {
      developerA: {
        profile: profileA,
        statistics: statsA
      },
      developerB: {
        profile: profileB,
        statistics: statsB
      },
      comparison,
      winner: overallWinner,
      aiAnalysis
    };
  } catch (error) {
    throw new Error(`Comparison failed: ${error.message}`);
  }
};

module.exports = {
  compareDevelopers
};