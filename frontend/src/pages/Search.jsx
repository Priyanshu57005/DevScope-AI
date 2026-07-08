import { useState } from "react";
import SearchBar from "../components/profile/SearchBar";
import UserCard from "../components/profile/UserCard";
import RepoList from "../components/profile/RepoList";
import StatisticsCard from "../components/profile/StatisticsCard";
import ActivityTimeline from "../components/profile/ActivityTimeline";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import AIScoreCard from "../components/ai/AIScoreCard";
import StrengthCard from "../components/ai/StrengthCard";
import WeaknessCard from "../components/ai/WeaknessCard";
import SuggestionCards from "../components/ai/SuggestionCards";
import { fetchUserProfile } from "../services/githubApi";

const Home = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [events, setEvents] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [cached, setCached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (username) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);
    setEvents([]);
    setStatistics(null);
    setAiAnalysis(null);
    setCached(false);
    setSearched(true);

    try {
      const data = await fetchUserProfile(username);
      setUser(data.profile);
      setRepos(data.repositories);
      setEvents(data.events);
      setStatistics(data.statistics);
      setAiAnalysis(data.aiAnalysis);
      setCached(data.cached);
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
                Developer profile
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-sm mx-auto text-sm leading-relaxed">
              Search any GitHub username to instantly view their profile analytics,
              stats scoring, and AI-powered insights.
            </p>
          </div>
        )}

        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </div>

      {/* Result area */}
      <div className="max-w-4xl mx-auto">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {user && !loading && (
          <div className="space-y-12">
            <UserCard user={user} cached={cached} />
            
            <StatisticsCard statistics={statistics} profile={user} />
            
            {aiAnalysis && (
              <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">AI Insights Report</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <StrengthCard strengths={aiAnalysis.strengths} />
                  <WeaknessCard weaknesses={aiAnalysis.weaknesses} />
                </div>
                
                <SuggestionCards suggestions={aiAnalysis.suggestions} />
                <AIScoreCard aiAnalysis={aiAnalysis} />
              </div>
            )}
            
            <RepoList repos={repos} />
            
            <ActivityTimeline events={events} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
