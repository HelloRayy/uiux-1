import { useState, useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import { Game2Provider } from './context/Game2Context';
import { HostView } from './views/HostView';
import { AdminView } from './views/AdminView';
import { ParticipantView } from './views/ParticipantView';
import { HostView2 } from './views/HostView2';
import { ParticipantView2 } from './views/ParticipantView2';
import { parseRoute } from './utils/navigation';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const routeInfo = parseRoute(currentPath);

  // GAME 2 (UIUX-2) DISPATCHER
  if (routeInfo.gameVersion === 2) {
    return (
      <Game2Provider>
        {routeInfo.role === 'PLAY' ? (
          <ParticipantView2 />
        ) : (
          <HostView2 />
        )}
      </Game2Provider>
    );
  }

  // GAME 1 (CLASSIC) DISPATCHER
  return (
    <GameProvider>
      {routeInfo.role === 'ADMIN' ? (
        <AdminView />
      ) : routeInfo.role === 'PLAY' ? (
        <ParticipantView />
      ) : (
        <HostView />
      )}
    </GameProvider>
  );
}

export default App;
