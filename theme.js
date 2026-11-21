(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'george-theme';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';

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
    button.textContent = dark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
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
  document.body.append(button);
})();
