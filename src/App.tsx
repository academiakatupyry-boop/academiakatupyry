import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import HomePage from './pages/HomePage';
// MapPage removed
import GamePage from './pages/GamePage';
import CoordinateTrainingPage from './pages/CoordinateTrainingPage';
import PieceLearningPage from './pages/PieceLearningPage';
import FundamentalsPage from './pages/FundamentalsPage';
import ArenaPage from './pages/ArenaPage';
import ChroniclesPage from './pages/ChroniclesPage';
import MarketPage from './pages/MarketPage';
import SchoolsPage from './pages/SchoolsPage';
import SchoolFormPage from './pages/SchoolFormPage';
import ParentsPage from './pages/ParentsPage';
import ParentsFormPage from './pages/ParentsFormPage';
import ProfilePage from './pages/ProfilePage';
import LearnPage from './pages/LearnPage';
import LessonPage from './pages/LessonPage';
import OnboardingPage from './pages/OnboardingPage';
import SubscriptionPage from './pages/SubscriptionPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/:topicId" element={<LessonPage />} />
          <Route path="/fundamentals" element={<FundamentalsPage />} />
          {/* Map Route Removed */}
          <Route path="/board" element={<GamePage />} />
          <Route path="/learn/coordinates" element={<CoordinateTrainingPage />} />
          <Route path="/learn/pieces" element={<PieceLearningPage />} />
          <Route path="/arena" element={<ArenaPage />} />
          <Route path="/chronicles" element={<ChroniclesPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/school-form" element={<SchoolFormPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="/parents-form" element={<ParentsFormPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/stats" element={<ProfilePage initialTab="Estadísticas" />} />
        </Routes>
      </AppWrapper>
    </HashRouter>
  );
};

export default App;