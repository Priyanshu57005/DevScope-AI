const { calculateDeveloperScore } = require("../utils/githubScore");

const calculateStatistics = (profile, repositories, events) => {
    let totalStars = 0;
    let totalForks = 0;
    let totalWatchers = 0;
    let totalSize = 0;

    const languageStats = {};
    let totalQuality = 0;
    let reposWithAge = 0;
    let totalAgeInMonths = 0;
    let oldestRepoAge = 0;
    let newestRepoAge = Infinity;

    repositories.forEach((repo) => {
        totalStars += repo.stars || 0;
        totalForks += repo.forks || 0;
        totalWatchers += repo.watchers || 0;
        totalSize += repo.size || 0;

        if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }

        // Repository Quality Calculation (0 - 100 per repo)
        let repoQuality = 0;
        if (repo.description) repoQuality += 30;
        if (repo.size > 10) repoQuality += 30; // > 10KB
        if (repo.stars > 0) repoQuality += 20;
        if (repo.forks > 0) repoQuality += 20;
        totalQuality += repoQuality;

        // Repository Age Calculation
        if (repo.createdAt) {
            const ageInMonths = (Date.now() - new Date(repo.createdAt)) / (1000 * 60 * 60 * 24 * 30.44);
            if (!isNaN(ageInMonths)) {
                reposWithAge++;
                totalAgeInMonths += ageInMonths;
                if (ageInMonths > oldestRepoAge) oldestRepoAge = ageInMonths;
                if (ageInMonths < newestRepoAge) newestRepoAge = ageInMonths;
            }
        }
    });

    const totalRepos = repositories.length;
    const averageStars = totalRepos > 0 ? parseFloat((totalStars / totalRepos).toFixed(2)) : 0;
    const averageForks = totalRepos > 0 ? parseFloat((totalForks / totalRepos).toFixed(2)) : 0;
    const repositoryQuality = totalRepos > 0 ? Math.round(totalQuality / totalRepos) : 0;

    const languages = Object.keys(languageStats);
    const mostUsedLanguage = languages.length > 0
        ? languages.reduce((a, b) => languageStats[a] > languageStats[b] ? a : b)
        : "N/A";

    const technologyDiversity = Math.min(languages.length * 20, 100);

    const averageRepoAge = reposWithAge > 0 ? parseFloat((totalAgeInMonths / reposWithAge).toFixed(1)) : 0;

    // Activity Score from events
    const eventsList = Array.isArray(events) ? events : [];
    let rawActivityScore = 0;
    eventsList.forEach(event => {
        switch (event.type) {
            case "PushEvent":
                rawActivityScore += 5;
                break;
            case "PullRequestEvent":
                rawActivityScore += 10;
                break;
            case "IssuesEvent":
                rawActivityScore += 7;
                break;
            case "ReleaseEvent":
                rawActivityScore += 12;
                break;
            case "CreateEvent":
            case "DeleteEvent":
                rawActivityScore += 3;
                break;
            default:
                rawActivityScore += 2;
        }
    });
    // Add baseline score for public repositories and followers to make it represent general activity if no events exist
    const baseActivity = Math.min(15, (profile.publicRepos || 0) * 0.5 + (profile.followers || 0) * 0.1);
    const activityScore = Math.min(100, Math.round(rawActivityScore + baseActivity));

    // Find top repository (by stars + forks)
    const topRepository = totalRepos > 0
        ? repositories.reduce((max, repo) => {
            const currentScore = (repo.stars || 0) + (repo.forks || 0);
            const maxScore = (max.stars || 0) + (max.forks || 0);
            return currentScore > maxScore ? repo : max;
        })
        : null;

    const statsWithoutScore = {
        totalRepositories: profile.publicRepos !== undefined ? profile.publicRepos : totalRepos,
        totalStars,
        totalForks,
        totalWatchers,
        totalSize,
        averageStars,
        averageForks,
        repositoryQuality,
        technologyDiversity,
        repositoryAge: {
            averageAgeInMonths: averageRepoAge,
            oldestAgeInMonths: parseFloat(oldestRepoAge.toFixed(1)),
            newestAgeInMonths: newestRepoAge === Infinity ? 0 : parseFloat(newestRepoAge.toFixed(1))
        },
        activityScore,
        topRepository,
        languageDistribution: languageStats,
        mostUsedLanguage
    };

    // Calculate Developer Score
    const scoreResult = calculateDeveloperScore(profile, statsWithoutScore);

    return {
        ...statsWithoutScore,
        developerScore: scoreResult.score,
        developerScoreBreakdown: scoreResult.breakdown
    };
};

module.exports = {
    calculateStatistics,
};