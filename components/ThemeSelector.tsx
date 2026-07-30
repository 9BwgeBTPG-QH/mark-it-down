'use client';

import { useEffect, useId, useState } from 'react';
import type { Lang } from '@/content/index';
import {
  isStoredTheme,
  THEME_COLOR,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
  type ResolvedTheme,
  type ThemePreference,
} from '@/lib/theme';

const copy = {
  en: {
    label: 'Theme',
    options: {
      system: 'System',
      light: 'Light',
      dark: 'Dark',
    },
  },
  ja: {
    label: 'テーマ',
    options: {
      system: 'システム',
      light: 'ライト',
      dark: 'ダーク',
    },
  },
} satisfies Record<
  Lang,
  { label: string; options: Record<ThemePreference, string> }
>;

const preferences: ThemePreference[] = ['system', 'light', 'dark'];

function resolveSystem(media: MediaQueryList | null): ResolvedTheme {
  return media?.matches ? 'dark' : 'light';
}

function applyRootTheme(preference: ThemePreference, media: MediaQueryList | null) {
  const theme = preference === 'system' ? resolveSystem(media) : preference;
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themePreference = preference;
  root.style.colorScheme = theme;
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (themeColor) themeColor.content = THEME_COLOR[theme];
  window.dispatchEvent(
    new CustomEvent('mid-theme-change', {
      detail: { preference, theme },
    })
  );
}

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isStoredTheme(stored)) return stored;
    if (stored !== null) localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Storage failures are the documented System fallback.
  }
  return 'system';
}

export function ThemeSelector({ lang }: { lang: Lang }) {
  const labels = copy[lang];
  const id = useId();
  const [preference, setPreference] = useState<ThemePreference>('system');

  useEffect(() => {
    const media = window.matchMedia?.(THEME_MEDIA_QUERY) ?? null;

    const syncFromStorage = () => {
      const nextPreference = readPreference();
      setPreference(nextPreference);
      applyRootTheme(nextPreference, media);
    };

    const handleSystemChange = () => {
      if (document.documentElement.dataset.themePreference !== 'system') return;
      setPreference('system');
      applyRootTheme('system', media);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === THEME_STORAGE_KEY) syncFromStorage();
    };

    syncFromStorage();
    media?.addEventListener?.('change', handleSystemChange);
    if (media && !media.addEventListener) media.addListener(handleSystemChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      media?.removeEventListener?.('change', handleSystemChange);
      if (media && !media.removeEventListener) media.removeListener(handleSystemChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const selectPreference = (requested: ThemePreference) => {
    const media = window.matchMedia?.(THEME_MEDIA_QUERY) ?? null;
    let persisted = requested;

    try {
      if (requested === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, requested);
      }
    } catch {
      persisted = 'system';
    }

    setPreference(persisted);
    applyRootTheme(persisted, media);
  };

  return (
    <fieldset className="theme-selector">
      <legend className="visually-hidden">{labels.label}</legend>
      {preferences.map((option) => {
        const optionId = `${id}-${option}`;
        return (
          <label className="theme-selector-option" htmlFor={optionId} key={option}>
            <input
              checked={preference === option}
              className="theme-selector-input"
              id={optionId}
              name={`${id}-theme`}
              onChange={() => selectPreference(option)}
              type="radio"
              value={option}
            />
            <span>{labels.options[option]}</span>
          </label>
        );
      })}
      <span className="visually-hidden" aria-live="polite">
        {labels.label}: {labels.options[preference]}
      </span>
    </fieldset>
  );
}
