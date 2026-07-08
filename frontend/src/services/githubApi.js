const BASE_URL = "https://devscope-ai-production.up.railway.app/api";

export async function fetchUserProfile(username) {
  const response = await fetch(`${BASE_URL}/profile/${username}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Developer not found or API failure");
  }
  const result = await response.json();
  return result.data; // Returns: { profile, repositories, events, statistics, aiAnalysis, cached }
}

export async function compareDevelopers(developerA, developerB) {
  const response = await fetch(`${BASE_URL}/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ developerA, developerB }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to compare developers");
  }
  const result = await response.json();
  return result.data; // Returns: { developerA, developerB, comparison, winner, aiAnalysis }
}
