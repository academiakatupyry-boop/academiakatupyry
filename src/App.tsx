import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import PrototypeNav from './components/PrototypeNav';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import GamePage from './pages/GamePage';
import CoordinateTrainingPage from './pages/CoordinateTrainingPage';
import PieceLearningPage from './pages/PieceLearningPage';
import ArenaPage from './pages/ArenaPage';
import ChroniclesPage from './pages/ChroniclesPage';
import MarketPage from './pages/MarketPage';
import SchoolsPage from './pages/SchoolsPage';
import SchoolFormPage from './pages/SchoolFormPage';
import ProfilePage from './pages/ProfilePage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <PrototypeNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
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
    </HashRouter>
  );
};

export default App;