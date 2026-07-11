import type { Config } from 'tailwindcss';

// Design token source of truth: DESIGN.md ("Manuscript & Ink").
// Every value below must trace to a DESIGN.md line — do not invent numbers here.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // DESIGN.md §2 Colors
        paper: '#fcfbf8',
        'paper-shade': '#f5f2ec',
        ink: '#211e1c',
        'ink-2': '#31302e',
        'ink-muted': '#615d59',
        'ink-faint': '#a39e98',
        seal: '#9d2b22',
        'seal-deep': '#8b241c',
        brass: '#8a6d3b',
        hairline: '#e2ddd4',
      },
      fontFamily: {
        // DESIGN.md §3 Typography — headings: Lora, EN body: Raleway,
        // JA fallback stack kept separate (no Raleway for JA body).
        serif: ['var(--font-lora)', 'ui-serif', 'serif'],
        sans: ['var(--font-raleway)', 'ui-sans-serif', 'sans-serif'],
        'sans-ja': ['"Hiragino Sans"', '"Noto Sans JP"', 'Meiryo', 'sans-serif'],
        // DESIGN.md §3: JA 見出しは Lora + 和文ゴシックの混植（Lora は約物・欧文にのみ効く）
        'serif-ja': ['var(--font-lora)', '"Hiragino Sans"', '"Noto Sans JP"', 'Meiryo', 'sans-serif'],
      },
      fontSize: {
        // DESIGN.md §3 スケール（desktop / mobile variants both exposed as tokens）
        display: ['56px', { lineHeight: '1.15' }],
        'display-mobile': ['36px', { lineHeight: '1.15' }],
        h1: ['38px', { lineHeight: '1.2' }],
        'h1-mobile': ['30px', { lineHeight: '1.2' }],
        h2: ['28px', { lineHeight: '1.3' }],
        h3: ['20px', { lineHeight: '1.4' }],
        body: ['17px', { lineHeight: '1.7' }],
        'body-ja': ['16px', { lineHeight: '1.9' }],
        caption: ['14px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        // DESIGN.md §4 Layout & Surfaces — Container
        content: '720px',
        section: '1120px',
      },
      borderRadius: {
        // DESIGN.md §4 Layout & Surfaces — Radius (2px buttons/inputs, 4px cards; no larger radius)
        sm: '2px',
        DEFAULT: '4px',
        md: '4px',
      },
      boxShadow: {
        // DESIGN.md §4 Layout & Surfaces — Shadow (floating elements only)
        float: '0 2px 8px rgba(33, 30, 28, 0.08)',
      },
      transitionDuration: {
        // DESIGN.md §5 Motion
        instant: '120ms',
        fast: '200ms',
        normal: '280ms',
      },
      spacing: {
        // DESIGN.md §4 Layout & Surfaces — Spacing (4px basis: 4/8/12/16/24/32/48/64/96).
        // Tailwind's default scale already lands on all of these (1=4px..24=96px);
        // this entry only documents section-gap intent, it adds no new value.
        section: '96px',
        'section-mobile': '64px',
      },
    },
  },
  plugins: [],
};

export default config;
