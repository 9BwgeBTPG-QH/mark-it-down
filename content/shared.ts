import type { Lang } from '@/content/index';

export interface SiteNavLink {
  slug: string;
  en: string;
  ja: string;
}

// Header nav: primary product pages only, kept short enough for a single-row
// sticky bar (DESIGN.md §6 "ナビ：常時表示・sticky"). Selected from the
// current docs/index.html header-nav baseline, plus Web Clipper / RSS Reader
// — real product surfaces that were previously footer-only in the current
// site; surfacing them in the header closes that gap. Secondary pages
// (Philosophy, Troubleshooting, Feedback, Privacy) move to SiteFooter only.
export const primaryNavLinks: SiteNavLink[] = [
  { slug: 'index', en: 'Home', ja: 'ホーム' },
  { slug: 'features', en: 'Features', ja: '機能' },
  { slug: 'clipper', en: 'Web Clipper', ja: 'Web Clipper' },
  { slug: 'rss', en: 'RSS Reader', ja: 'RSS Reader' },
  { slug: 'templates', en: 'Templates', ja: 'テンプレート' },
  { slug: 'okf', en: 'OKF', ja: 'OKF' },
  { slug: 'faq', en: 'FAQ', ja: 'よくある質問' },
  { slug: 'changelog', en: 'Changelog', ja: '更新履歴' },
];

// Footer nav: full site map (primary links plus secondary pages), matching
// the current docs/index.html footer-nav's role as the exhaustive sitemap.
export const footerNavLinks: SiteNavLink[] = [
  ...primaryNavLinks,
  { slug: 'why', en: 'Philosophy', ja: 'MIDとは' },
  { slug: 'troubleshooting', en: 'Troubleshooting', ja: 'トラブルシューティング' },
  { slug: 'feedback', en: 'Feedback', ja: 'フィードバック' },
  { slug: 'privacy-policy', en: 'Privacy', ja: 'プライバシー' },
];

// Flat `/<name>.html` (EN) / `/<name>-ja.html` (JA) URLs — matches the
// existing GitHub Pages URL structure (docs/*.html) that #1593 preserves.
export function navHref(slug: string, lang: Lang): string {
  if (slug === 'index') return lang === 'en' ? '/index.html' : '/index-ja.html';
  return lang === 'en' ? `/${slug}.html` : `/${slug}-ja.html`;
}

// EN⇄JA switch always targets the home page: SiteNav/SiteFooter don't yet
// receive the current page's JA/EN counterpart slug (only the index route is
// wired in Phase 2). Pages built in later phases can pass a same-page target
// once they exist on both sides.
export function langSwitchHref(lang: Lang): string {
  return lang === 'en' ? '/index-ja.html' : '/index.html';
}

interface SharedCopy {
  brand: string;
  navLabel: string;
  menuToggle: string;
  langSwitchLabel: string;
  footerLabel: string;
  copyright: string;
}

export const sharedContent: Record<Lang, SharedCopy> = {
  en: {
    brand: 'Mark It Down',
    navLabel: 'Main navigation',
    menuToggle: 'Menu',
    langSwitchLabel: '日本語',
    footerLabel: 'Footer navigation',
    copyright: '© 2025-2026 reduktion.dev',
  },
  ja: {
    brand: 'Mark It Down',
    navLabel: 'メインナビゲーション',
    menuToggle: 'メニュー',
    langSwitchLabel: 'English',
    footerLabel: 'フッターナビゲーション',
    copyright: '© 2025-2026 reduktion.dev',
  },
};
