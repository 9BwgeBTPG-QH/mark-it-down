export const THEME_STORAGE_KEY = 'mid-theme';
export const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';
export const THEME_COLOR = {
  light: '#f2ede4',
  dark: '#0a0a09',
} as const;

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = Exclude<ThemePreference, 'system'>;

export function isStoredTheme(value: string | null): value is ResolvedTheme {
  return value === 'light' || value === 'dark';
}

// Deliberately dependency-free and inline: this executes in <head> before the
// stylesheet request so the effective root theme is fixed for first paint.
export const THEME_BOOTSTRAP_SCRIPT = String.raw`(function(){var d=document.documentElement,k="mid-theme",q="(prefers-color-scheme: dark)",m=window.matchMedia(q),p="system";try{var v=localStorage.getItem(k);if(v==="light"||v==="dark"){p=v}else if(v!==null){localStorage.removeItem(k)}}catch(e){}var t=p==="system"?(m.matches?"dark":"light"):p,c=document.querySelector('meta[name="theme-color"]');d.setAttribute("data-theme",t);d.setAttribute("data-theme-preference",p);d.style.colorScheme=t;if(c)c.content=t==="dark"?"#0a0a09":"#f2ede4";if(window.performance&&performance.mark)performance.mark("mid-theme-ready")}());`;
