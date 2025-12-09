import React from 'react';
import { GameProvider } from './context/GameContext';
import { Board } from './components/Board';
import { Controls } from './components/Controls';
import './App.css';

import { GameOverModal } from './components/GameOverModal';

const AppContent: React.FC = () => {
  return (
    <div className="app-container">
      <div style={{ position: 'relative' }}>
        <Board />
        <GameOverModal />
      </div>
      <Controls />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
