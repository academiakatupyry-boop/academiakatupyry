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
import ProfilePage from './pages/ProfilePage';
import LearnPage from './pages/LearnPage';
import LessonPage from './pages/LessonPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppWrapper>
    </HashRouter>
  );
};

export default App;