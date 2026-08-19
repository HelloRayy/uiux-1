import { useState, useEffect } from 'react';
import { GameProvider } from './context/GameContext';
import { HostView } from './views/HostView';
import { AdminView } from './views/AdminView';
import { ParticipantView } from './views/ParticipantView';
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

  return (
    <GameProvider initialRoute={routeInfo}>
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
