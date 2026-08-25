export function navigateTo(path: string) {
  if (typeof window !== 'undefined') {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }
}

export interface ParsedRoute {
  gameVersion: 1 | 2;
  role: 'HOST' | 'PLAY' | 'ADMIN';
  slideNumber: number | null;
  isTutorial: boolean;
}

export function parseRoute(pathname: string): ParsedRoute {
  const clean = pathname.replace(/\/$/, '') || '/';

  // =========================================================================
  // GAME 2 (UIUX-2) ROUTES: /uiux-2, /uiux-2/play, /uiux-2/1, /uiux-2/tutorial
  // =========================================================================
  if (clean.startsWith('/uiux-2')) {
    const subPath = clean.replace('/uiux-2', '') || '/';

    // Play route: /uiux-2/play, /uiux-2/join, /uiux-2/vote
    if (subPath.startsWith('/play') || subPath.startsWith('/join') || subPath.startsWith('/vote')) {
      const match = subPath.match(/\/play\/(\d+)/);
      const slideNumber = match ? parseInt(match[1], 10) : null;
      return {
        gameVersion: 2,
        role: 'PLAY',
        slideNumber,
        isTutorial: false,
      };
    }

    // Tutorial route: /uiux-2/tutorial, /uiux-2/panduan, /uiux-2/intro, /uiux-2/0
    if (subPath === '/tutorial' || subPath === '/panduan' || subPath === '/intro' || subPath === '/0') {
      return {
        gameVersion: 2,
        role: 'HOST',
        slideNumber: 0,
        isTutorial: true,
      };
    }

    // Numbered Slide route: /uiux-2/1, /uiux-2/2, ...
    const slideMatch = subPath.match(/^\/(\d+)$/);
    if (slideMatch) {
      const slideNumber = parseInt(slideMatch[1], 10);
      return {
        gameVersion: 2,
        role: 'HOST',
        slideNumber: slideNumber >= 1 ? slideNumber : 1,
        isTutorial: false,
      };
    }

    // Default Game 2 Root: /uiux-2 (Lobby)
    return {
      gameVersion: 2,
      role: 'HOST',
      slideNumber: null,
      isTutorial: false,
    };
  }

  // =========================================================================
  // GAME 1 (CLASSIC) ROUTES: /, /play, /admin, /tutorial, /1.../5
  // =========================================================================

  // Admin route: /admin or /admin/1, /admin/2, /control, /mentor
  if (clean.startsWith('/admin') || clean.startsWith('/control') || clean.startsWith('/mentor')) {
    if (clean === '/admin/tutorial' || clean === '/admin/panduan' || clean === '/admin/intro') {
      return {
        gameVersion: 1,
        role: 'ADMIN',
        slideNumber: 0,
        isTutorial: true,
      };
    }
    const match = clean.match(/\/admin\/(\d+)/) || clean.match(/\/control\/(\d+)/);
    const slideNumber = match ? parseInt(match[1], 10) : null;
    return {
      gameVersion: 1,
      role: 'ADMIN',
      slideNumber: slideNumber && slideNumber >= 1 ? slideNumber : null,
      isTutorial: false,
    };
  }

  // Participant Play route: /play, /play/1, /join, /vote, /room
  if (clean.startsWith('/play') || clean.startsWith('/join') || clean.startsWith('/vote') || clean.startsWith('/room')) {
    const match = clean.match(/\/play\/(\d+)/) || clean.match(/\/room\/(\d+)/);
    const slideNumber = match ? parseInt(match[1], 10) : null;
    return {
      gameVersion: 1,
      role: 'PLAY',
      slideNumber: slideNumber && slideNumber >= 1 ? slideNumber : null,
      isTutorial: false,
    };
  }

  // Tutorial Direct Route: /tutorial, /panduan, /intro, /0
  if (clean === '/tutorial' || clean === '/panduan' || clean === '/intro' || clean === '/0') {
    return {
      gameVersion: 1,
      role: 'HOST',
      slideNumber: 0,
      isTutorial: true,
    };
  }

  // Numeric Host Direct Route: /1, /2, /3, /4, /5 or /case/1, /host/1
  const directMatch = clean.match(/^\/(\d+)$/) || clean.match(/\/case\/(\d+)/) || clean.match(/\/host\/(\d+)/);
  if (directMatch) {
    const slideNumber = parseInt(directMatch[1], 10);
    return {
      gameVersion: 1,
      role: 'HOST',
      slideNumber: slideNumber >= 1 ? slideNumber : 1,
      isTutorial: false,
    };
  }

  // Default Root Landing / Host: / or /host
  return {
    gameVersion: 1,
    role: 'HOST',
    slideNumber: null, // null means Lobby (Landing Page Hero)
    isTutorial: false,
  };
}
