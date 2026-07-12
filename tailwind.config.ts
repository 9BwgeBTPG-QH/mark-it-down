import type { Config } from 'tailwindcss';

// Design source of truth: app/original.css (eed65be:docs/style.src.css port)
// — see DESIGN.md. Page markup uses the original stylesheet's class names,
// not Tailwind utilities; Tailwind stays only for its preflight reset (the
// restored pages were verified against old-site screenshots with preflight
// active) and the few core utilities in shared components (components/
// Budoux.tsx). The Manuscript & Ink token extensions were removed with the
// #1593 design rollback — do not add design tokens back here.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
