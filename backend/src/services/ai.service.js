const { getGeminiModel } = require("../config/ai");

const getMockProfileAnalysis = (profile, stats) => {
  return {
    strengths: [
      `Solid grasp of coding in ${stats.mostUsedLanguage || "JavaScript"}.`,
      `Good code quality rating with a score of ${stats.repositoryQuality}/100.`,
      (stats.totalStars || 0) > 10 
        ? `Demonstrated code impact with ${stats.totalStars} total stars.` 
        : `Active repository creation with ${stats.totalRepositories || 0} public repositories.`
    ],
    weaknesses: [
      (stats.activityScore || 0) < 40 
        ? "Relatively low recent public activity on GitHub." 
        : "Could benefit from wider open-source engagement.",
      (stats.technologyDiversity || 0) < 40 
        ? "Limited diversity of programming languages in public repositories." 
        : "Some older repositories could benefit from recent updates and refactoring."
    ],
    suggestions: [
      "Improve repository documentation by adding clear descriptions and readme files.",
      "Consider contributing to more open-source projects to boost your activity score.",
      "Experiment with different programming languages to expand your technology diversity."
    ],
    careerAdvice: "Your current profile shows a strong foundation. Focus on building and showcasing larger, end-to-end projects in your primary languages, and maintain a consistent committing schedule to highlight active involvement to potential recruiters."
  };
};

const getMockComparisonAnalysis = (devA, devB, winner) => {
  const nameA = devA.profile.name || devA.profile.username;
  const nameB = devB.profile.name || devB.profile.username;
  
  if (winner === "developerA") {
    return {
      winnerExplanation: `${nameA} emerges as the stronger developer overall. This is driven by their higher Developer Score of ${devA.statistics.developerScore}/100 compared to ${nameB}'s score of ${devB.statistics.developerScore}/100, showing higher reputation, activity, and code impact on GitHub.`
    };
  } else if (winner === "developerB") {
    return {
      winnerExplanation: `${nameB} is the stronger developer overall, driven by their higher Developer Score of ${devB.statistics.developerScore}/100 compared to ${nameA}'s score of ${devA.statistics.developerScore}/100. They show better overall GitHub metrics across reputation, repository quality, and code impact.`
    };
  } else {
    return {
      winnerExplanation: `Both ${nameA} and ${nameB} are evenly matched. Their Developer Scores are equal at ${devA.statistics.developerScore}/100, reflecting similar code impact, quality scores, and activity levels.`
    };
  }
};

const generateProfileAnalysis = async (profile, stats) => {
  const model = getGeminiModel();
  if (!model) {
    return getMockProfileAnalysis(profile, stats);
  }

  const prompt = `
    You are an expert technical recruiter and developer career coach.
    Analyze the following GitHub developer statistics and generate professional insights.
    
    Developer Profile:
    Name: ${profile.name || profile.username}
    Bio: ${profile.bio || "No bio"}
    Company: ${profile.company || "N/A"}
    Location: ${profile.location || "N/A"}
    Followers: ${profile.followers || 0}
    Following: ${profile.following || 0}
    
    Calculated Metrics:
    Total Repositories: ${stats.totalRepositories}
    Total Stars: ${stats.totalStars}
    Total Forks: ${stats.totalForks}
    Average Stars per Repo: ${stats.averageStars}
    Average Forks per Repo: ${stats.averageForks}
    Repository Quality Score: ${stats.repositoryQuality}/100
    Technology Diversity: ${stats.technologyDiversity}/100
    Most Used Language: ${stats.mostUsedLanguage}
    Activity Score: ${stats.activityScore}/100
    Developer Score: ${stats.developerScore}/100
    
    Guidelines:
    - Strengths: Highlight 3 specific strengths based on stars, followers, diversity, or quality.
    - Weaknesses: Identify 2 technical or profile gaps (e.g. lack of description, low star ratio, low activity).
    - Suggestions: Give 3 actionable improvements.
    - Career Advice: General career tips based on their tech stack and statistics.
    
    You MUST output ONLY a valid JSON object with the following schema:
    {
      "strengths": ["string", "string", "string"],
      "weaknesses": ["string", "string"],
      "suggestions": ["string", "string", "string"],
      "careerAdvice": "string"
    }
  `;

  try {
    const result = await model.generateContent({
      contents: prompt,
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API error, using mock fallback:", error.message);
    return getMockProfileAnalysis(profile, stats);
  }
};

const generateComparisonAnalysis = async (devA, devB, comparison, winner) => {
  const model = getGeminiModel();
  if (!model) {
    return getMockComparisonAnalysis(devA, devB, winner);
  }

  const nameA = devA.profile.name || devA.profile.username;
  const nameB = devB.profile.name || devB.profile.username;

  const prompt = `
    You are an expert technical evaluator comparing two developers.
    Analyze their stats and comparison metrics, and explain who won and why.
    
    Developer A (${nameA}):
    - Developer Score: ${devA.statistics.developerScore}/100
    - Total Stars: ${devA.statistics.totalStars}
    - Followers: ${devA.profile.followers}
    - Quality Score: ${devA.statistics.repositoryQuality}/100
    - Activity Score: ${devA.statistics.activityScore}/100
    
    Developer B (${nameB}):
    - Developer Score: ${devB.statistics.developerScore}/100
    - Total Stars: ${devB.statistics.totalStars}
    - Followers: ${devB.profile.followers}
    - Quality Score: ${devB.statistics.repositoryQuality}/100
    - Activity Score: ${devB.statistics.activityScore}/100
    
    Overall Winner Decided by Engine: ${winner === "developerA" ? nameA : winner === "developerB" ? nameB : "Draw"}
    
    Guidelines:
    - Winner Explanation: Write a detailed paragraph explaining why this developer is the winner, or why it's a draw. Rely strictly on the calculated numbers.
    
    You MUST output ONLY a valid JSON object with the following schema:
    {
      "winnerExplanation": "string"
    }
  `;

  try {
    const result = await model.generateContent({
      contents: prompt,
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
    const responseText = result.response.text();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Gemini API error, using mock fallback:", error.message);
    return getMockComparisonAnalysis(devA, devB, winner);
  }
};

module.exports = {
  generateProfileAnalysis,
  generateComparisonAnalysis
};