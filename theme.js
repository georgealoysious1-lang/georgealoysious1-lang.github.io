(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'george-theme';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  const sun = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
  const moon = '<path d="M20.9 13.2A9 9 0 0 1 10.8 3.1a9 9 0 1 0 10.1 10.1Z"/>';

  function savedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (dark ? sun : moon) + '</svg>';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    button.setAttribute('aria-pressed', String(dark));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#000000' : '#0000f2');
  }

  function syncPreference() {
    const saved = savedTheme();
    applyTheme(saved === 'dark' || saved === 'light' ? saved : preference.matches ? 'dark' : 'light');
  }

  button.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
    applyTheme(theme);
  });
  preference.addEventListener('change', syncPreference);
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) syncPreference();
  });
  syncPreference();
  function mountToggle() {
    const navigation = document.querySelector('.site-header .nav-actions');
    if (navigation && button.parentElement !== navigation) navigation.prepend(button);
  }
  // Wait for hydration before adding a control to the React navigation.
  function startToggle() {
    const observer = new MutationObserver(mountToggle);
    observer.observe(document.getElementById('root'), { childList: true, subtree: true });
    mountToggle();
  }
  if (window.__portfolioReady) {
    startToggle();
  } else {
    window.addEventListener('portfolio-ready', startToggle, { once: true });
  }
})();
