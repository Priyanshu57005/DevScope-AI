import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { fetchGitHubUser } from "../services/githubApi";

const Home = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setSearched(true);

    try {
      const { user: userData, repos: repoData } = await fetchGitHubUser(username);
      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero area */}
      <div className="text-center mb-10">
        {!searched && (
          <div className="mb-8 space-y-3 animate-fade-in">
            <p className="text-[var(--text-muted)] text-sm uppercase tracking-[0.3em] font-medium">
              Explore GitHub
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-tight">
              Discover any
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                GitHub profile
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-sm mx-auto text-sm leading-relaxed">
              Search any GitHub username to instantly view their profile, stats,
              and open-source contributions.
            </p>
          </div>
        )}

        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      {/* Result area */}
      <div className="max-w-3xl mx-auto">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {user && !loading && (
          <>
            <UserCard user={user} />
            <RepoList repos={repos} />
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
