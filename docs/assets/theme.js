(function () {
  'use strict';

  var STORAGE_KEY = 'mid-theme';
  var MEDIA_QUERY = '(prefers-color-scheme: dark)';
  var root = document.documentElement;
  var media = window.matchMedia(MEDIA_QUERY);
  var selectors = document.querySelectorAll('[data-static-theme-selector]');

  function isStoredTheme(value) {
    return value === 'light' || value === 'dark';
  }

  function readPreference() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (isStoredTheme(stored)) return stored;
      if (stored !== null) localStorage.removeItem(STORAGE_KEY);
    } catch (_error) {
      // Storage failures intentionally fall back to System.
    }
    return 'system';
  }

  function resolvedTheme(preference) {
    return preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
  }

  function syncControls(preference) {
    selectors.forEach(function (selector) {
      selector.querySelectorAll('input[type="radio"]').forEach(function (input) {
        input.checked = input.value === preference;
      });
    });
  }

  function applyTheme(preference) {
    var theme = resolvedTheme(preference);
    var themeColor = document.querySelector('meta[name="theme-color"]');
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-theme-preference', preference);
    root.style.colorScheme = theme;
    if (themeColor) themeColor.content = theme === 'dark' ? '#0a0a09' : '#f2ede4';
    syncControls(preference);
    window.dispatchEvent(
      new CustomEvent('mid-theme-change', {
        detail: { preference: preference, theme: theme },
      })
    );
  }

  function chooseTheme(requested) {
    var persisted = requested;
    try {
      if (requested === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, requested);
    } catch (_error) {
      persisted = 'system';
    }
    applyTheme(persisted);
  }

  selectors.forEach(function (selector) {
    selector.addEventListener('change', function (event) {
      if (event.target.matches('input[type="radio"]')) chooseTheme(event.target.value);
    });
  });

  function handleSystemChange() {
    if (root.getAttribute('data-theme-preference') === 'system') applyTheme('system');
  }

  function handleStorage(event) {
    if (event.key === null || event.key === STORAGE_KEY) applyTheme(readPreference());
  }

  if (media.addEventListener) media.addEventListener('change', handleSystemChange);
  else media.addListener(handleSystemChange);
  window.addEventListener('storage', handleStorage);
  applyTheme(readPreference());
})();
