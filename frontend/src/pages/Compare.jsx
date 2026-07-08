import React, { useState } from "react";
import CompareForm from "../components/compare/CompareForm";
import CompareCard from "../components/compare/CompareCard";
import CompareStats from "../components/compare/CompareStats";
import WinnerCard from "../components/compare/WinnerCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { compareDevelopers } from "../services/githubApi";

const Compare = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleCompare = async (developerA, developerB) => {
    setLoading(true);
    setError(null);
    setComparisonData(null);
    setSearched(true);

    try {
      const data = await compareDevelopers(developerA, developerB);
      setComparisonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
      {/* Title area */}
      <div className="text-center mb-10">
        {!searched && (
          <div className="mb-8 space-y-3 animate-fade-in">
            <p className="text-[var(--text-muted)] text-sm uppercase tracking-[0.3em] font-medium">
              Developer Clash
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-tight">
              Compare Two
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                GitHub profiles
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-sm mx-auto text-sm leading-relaxed">
              Input two GitHub usernames to compare their contributions, code quality, reputation, and let AI declare the winner.
            </p>
          </div>
        )}

        <CompareForm onCompare={handleCompare} isLoading={loading} />
      </div>

      {/* Result Area */}
      <div className="max-w-4xl mx-auto space-y-10">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {comparisonData && !loading && (
          <div className="space-y-12">
            <CompareCard 
              developerA={comparisonData.developerA} 
              developerB={comparisonData.developerB} 
            />
            
            <WinnerCard 
              winner={comparisonData.winner} 
              developerA={comparisonData.developerA} 
              developerB={comparisonData.developerB} 
              aiAnalysis={comparisonData.aiAnalysis}
            />

            <CompareStats 
              comparison={comparisonData.comparison} 
              developerA={comparisonData.developerA} 
              developerB={comparisonData.developerB} 
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Compare;