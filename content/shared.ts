import type { Lang } from '@/content/index';

export interface SiteNavLink {
  slug: string;
  en: string;
  ja: string;
}

// Original-design nav (eed65be:docs/index.html header-nav, restored by the
// #1593 rollback decision 2026-07-12): Home / Philosophy / Features / OKF /
// Templates / FAQ / Troubleshooting / Changelog / Feedback / Privacy.
// Web Clipper / RSS Reader are footer-only, exactly as the old site had them.
export const primaryNavLinks: SiteNavLink[] = [
  { slug: 'index', en: 'Home', ja: 'ホーム' },
  { slug: 'why', en: 'Philosophy', ja: 'MIDとは' },
  { slug: 'features', en: 'Features', ja: '機能' },
  { slug: 'okf', en: 'OKF', ja: 'OKF' },
  { slug: 'templates', en: 'Templates', ja: 'テンプレート' },
  { slug: 'faq', en: 'FAQ', ja: 'よくある質問' },
  { slug: 'troubleshooting', en: 'Troubleshooting', ja: 'トラブルシューティング' },
  { slug: 'changelog', en: 'Changelog', ja: '更新履歴' },
  { slug: 'feedback', en: 'Feedback', ja: 'フィードバック' },
  { slug: 'privacy-policy', en: 'Privacy', ja: 'プライバシー' },
];

// Footer nav: the old site's footer-nav order (icon brand row + this list).
export const footerNavLinks: SiteNavLink[] = [
  { slug: 'index', en: 'Home', ja: 'ホーム' },
  { slug: 'features', en: 'Features', ja: '機能' },
  { slug: 'clipper', en: 'Web Clipper', ja: 'Web Clipper' },
  { slug: 'rss', en: 'RSS Reader', ja: 'RSS Reader' },
  { slug: 'okf', en: 'OKF', ja: 'OKF' },
  { slug: 'templates', en: 'Templates', ja: 'テンプレート' },
  { slug: 'faq', en: 'FAQ', ja: 'よくある質問' },
  { slug: 'troubleshooting', en: 'Troubleshooting', ja: 'トラブルシューティング' },
  { slug: 'changelog', en: 'Changelog', ja: '更新履歴' },
  { slug: 'feedback', en: 'Feedback', ja: 'フィードバック' },
  { slug: 'privacy-policy', en: 'Privacy', ja: 'プライバシー' },
];

// Flat `/<name>.html` (EN) / `/<name>-ja.html` (JA) URLs — matches the
// existing GitHub Pages URL structure (docs/*.html) that #1593 preserves.
export function navHref(slug: string, lang: Lang): string {
  if (slug === 'index') return lang === 'en' ? '/index.html' : '/index-ja.html';
  return lang === 'en' ? `/${slug}.html` : `/${slug}-ja.html`;
}

// EN⇄JA switch target for a given page: defaults to the home page (`slug`
// omitted) but Phase 3's PageShell passes the current page's own slug so the
// switch lands on that page's language counterpart instead of always
// bouncing to index. Reuses navHref so the EN/JA filename mapping has one
// source of truth.
export function langSwitchHref(lang: Lang, slug: string = 'index'): string {
  const targetLang: Lang = lang === 'en' ? 'ja' : 'en';
  return navHref(slug, targetLang);
}

interface SharedCopy {
  brand: string;
  navLabel: string;
  langSwitchLabel: string;
  footerLabel: string;
  copyright: string;
  // 旧サイトの skip link / ヘッダタグライン / ロゴリンク aria-label
  skipLabel: string;
  tagline: string;
  homeAriaLabel: string;
}

export const sharedContent: Record<Lang, SharedCopy> = {
  en: {
    brand: 'Mark It Down',
    navLabel: 'Main navigation',
    langSwitchLabel: '日本語',
    footerLabel: 'Footer navigation',
    copyright: '© 2025-2026 reduktion.dev',
    skipLabel: 'Skip to main content',
    tagline: 'Your browser is now a writing desk.',
    homeAriaLabel: 'Mark It Down Home',
  },
  ja: {
    brand: 'Mark It Down',
    navLabel: 'メインナビゲーション',
    langSwitchLabel: 'English',
    footerLabel: 'フッターナビゲーション',
    copyright: '© 2025-2026 reduktion.dev',
    skipLabel: 'メインコンテンツへスキップ',
    tagline: 'ブラウザが、書斎になる。',
    homeAriaLabel: 'Mark It Down ホーム',
  },
};
