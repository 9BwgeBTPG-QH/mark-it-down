// Language auto-redirect restored from the old static pages (eed65be, #1593
// Wave R-shared). Every old page carried two inline head scripts' worth of
// behavior:
// 1. Redirect: EN pages sent ja-locale visitors to `<page>-ja.html`, JA pages
//    sent everyone else to `<page>.html`, both gated on
//    sessionStorage.langOverride (git show eed65be:docs/why.html /
//    why-ja.html).
// 2. Override: the nav/footer language-switcher anchors set
//    `sessionStorage.langOverride = '1'` via inline onclick, so an explicit
//    switch is not immediately undone by the other page's redirect.
// The old target was hardcoded per page; here it is derived from
// location.pathname (handles both `/why.html` on GitHub Pages and the
// extensionless `/why` that Pages also serves / `next dev` uses). The onclick
// is replaced with one delegated listener — same pattern as GoogleAnalytics's
// data-ga-cta listener — so SiteNav/SiteFooter stay server components.
// Rendered as a plain parser-blocking inline <script> at the top of <body>,
// the closest static-export equivalent of the old head placement (runs before
// any content paints, so no flash of the wrong language).

const redirectFor = {
  en: `var file = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (lang.indexOf('ja') === 0 && !sessionStorage.getItem('langOverride') && !/-ja(\\.html)?$/.test(file)) {
      if (file === '' || file === 'index.html' || file === 'index') {
        location.replace('index-ja.html');
      } else if (/\\.html$/.test(file)) {
        location.replace(file.replace(/\\.html$/, '-ja.html'));
      } else {
        location.replace(file + '-ja.html');
      }
    }`,
  ja: `var file = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (lang.indexOf('ja') !== 0 && !sessionStorage.getItem('langOverride')) {
      if (/-ja\\.html$/.test(file)) {
        location.replace(file.replace(/-ja\\.html$/, '.html'));
      } else if (/-ja$/.test(file)) {
        location.replace(file.slice(0, -3) + '.html');
      }
    }`,
};

export function LangRedirect({ lang }: { lang: 'en' | 'ja' }) {
  const script = `(function () {
  try {
    var lang = navigator.language || navigator.userLanguage || '';
    ${redirectFor[lang]}
  } catch (e) {}
  document.addEventListener('click', function (event) {
    var target = event.target;
    var anchor = target instanceof Element ? target.closest('.lang-switcher a') : null;
    if (anchor) {
      try {
        sessionStorage.setItem('langOverride', '1');
      } catch (e) {}
    }
  });
})();`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
