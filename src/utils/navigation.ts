export function navigateTo(path: string) {
  if (typeof window !== 'undefined') {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }
}

export function parseRoute(pathname: string) {
  const clean = pathname.replace(/\/$/, '') || '/';

  // Admin route: /admin or /admin/1, /admin/2, /control, /mentor
  if (clean.startsWith('/admin') || clean.startsWith('/control') || clean.startsWith('/mentor')) {
    if (clean === '/admin/tutorial' || clean === '/admin/panduan' || clean === '/admin/intro') {
      return {
        role: 'ADMIN' as const,
        slideNumber: 0,
        isTutorial: true,
      };
    }
    const match = clean.match(/\/admin\/(\d+)/) || clean.match(/\/control\/(\d+)/);
    const slideNumber = match ? parseInt(match[1], 10) : null;
    return {
      role: 'ADMIN' as const,
      slideNumber: slideNumber && slideNumber >= 1 ? slideNumber : null,
      isTutorial: false,
    };
  }

  // Participant Play route: /play, /play/1, /join, /vote, /room
  if (clean.startsWith('/play') || clean.startsWith('/join') || clean.startsWith('/vote') || clean.startsWith('/room')) {
    const match = clean.match(/\/play\/(\d+)/) || clean.match(/\/room\/(\d+)/);
    const slideNumber = match ? parseInt(match[1], 10) : null;
    return {
      role: 'PLAY' as const,
      slideNumber: slideNumber && slideNumber >= 1 ? slideNumber : null,
      isTutorial: false,
    };
  }

  // Tutorial Direct Route: /tutorial, /panduan, /intro, /0
  if (clean === '/tutorial' || clean === '/panduan' || clean === '/intro' || clean === '/0') {
    return {
      role: 'HOST' as const,
      slideNumber: 0,
      isTutorial: true,
    };
  }

  // Numeric Host Direct Route: /1, /2, /3, /4, /5 or /case/1, /host/1
  const directMatch = clean.match(/^\/(\d+)$/) || clean.match(/\/case\/(\d+)/) || clean.match(/\/host\/(\d+)/);
  if (directMatch) {
    const slideNumber = parseInt(directMatch[1], 10);
    return {
      role: 'HOST' as const,
      slideNumber: slideNumber >= 1 ? slideNumber : 1,
      isTutorial: false,
    };
  }

  // Default Root Landing / Host: / or /host
  return {
    role: 'HOST' as const,
    slideNumber: null, // null means Lobby (Landing Page Hero)
    isTutorial: false,
  };
}
