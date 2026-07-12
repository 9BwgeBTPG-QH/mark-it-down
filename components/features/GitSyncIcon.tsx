// Old docs/features.html Git Sync accordion's inline brand SVG (identical
// markup in both the EN and JA ground-truth pages), hardcoded here rather
// than stored as string data in content/features.ts since it is markup, not
// copy. Rendered inside <span class="accordion-version accordion-icon-svg">
// by FeatureAccordionShell in place of the plain glyph string used by every
// other category.
export function GitSyncIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="#F05032">
      <path d="M23.546 10.93L13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 1 1-1.103 1.033l-2.479-2.48v6.535a1.839 1.839 0 1 1-1.513-.036V8.73a1.838 1.838 0 0 1-.998-2.41L7.636 3.596.45 10.782a1.55 1.55 0 0 0 0 2.188l10.48 10.477a1.55 1.55 0 0 0 2.186 0l10.43-10.43a1.55 1.55 0 0 0 0-2.187" />
    </svg>
  );
}
