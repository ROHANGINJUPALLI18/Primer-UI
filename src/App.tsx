import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewView } from './views/OverviewView';
import { CompetencyView } from './views/CompetencyView';
import { RecommendationsView } from './views/RecommendationsView';
import { QuizStudioView } from './views/QuizStudioView';
import { AdminAnalyticsView } from './views/AdminAnalyticsView';
import { type OfficialDetail, fetchOfficials, FALLBACK_OFFICIALS } from './services/api';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [officials, setOfficials] = useState<OfficialDetail[]>(FALLBACK_OFFICIALS);
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialDetail>(FALLBACK_OFFICIALS[0]);
  const [isBackendLive, setIsBackendLive] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      const result = await fetchOfficials();
      if (result.data && result.data.length > 0) {
        setOfficials(result.data);
        setSelectedOfficial(result.data[0]);
      }
      setIsBackendLive(result.isLive);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--mc-canvas)] text-[var(--mc-ink)] flex flex-col font-['Sofia_Sans',sans-serif]">
      {/* Floating Pill Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        officials={officials}
        selectedOfficial={selectedOfficial}
        setSelectedOfficial={setSelectedOfficial}
        isBackendLive={isBackendLive}
      />

      {/* Main Content Area: padded for floating navbar */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 pt-32 pb-16">
        {currentTab === 'overview' && (
          <OverviewView 
            official={selectedOfficial} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'competencies' && (
          <CompetencyView 
            official={selectedOfficial} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'recommendations' && (
          <RecommendationsView 
            official={selectedOfficial} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'quiz' && (
          <QuizStudioView 
            official={selectedOfficial} 
            setCurrentTab={setCurrentTab} 
          />
        )}

        {currentTab === 'admin' && (
          <AdminAnalyticsView />
        )}
      </main>

      {/* Dark Mastercard Footer */}
      <Footer />
    </div>
  );
}

export default App;
