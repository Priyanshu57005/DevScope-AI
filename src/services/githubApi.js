const BASE_URL = "https://api.github.com";

export async function fetchUserProfile(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("User not found");
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

export async function fetchUserRepos(username) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=stars&per_page=12`
  );
  if (!response.ok) throw new Error("Failed to fetch repositories");
  return response.json();
}

export async function fetchGitHubUser(username) {
  const [user, repos] = await Promise.all([
    fetchUserProfile(username),
    fetchUserRepos(username),
  ]);
  return { user, repos };
}
