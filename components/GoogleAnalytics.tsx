import Script from 'next/script';

const GA_ID = 'G-BGZ2T3RGJW';

// Google Analytics restored for the #1593 rebuild (Phase 4), same property as
// the old docs/*.html head snippet. The old site also had inline
// `onclick="gtag('event','cta_click',...)"` on 10 CTA anchors; here a single
// delegated click listener replaces those so CTA components stay server
// components and only carry a `data-ga-cta="<label>"` attribute (labels are
// identical to the old event_label values, e.g. `hero`, `clipper-ja`).
// googletagmanager.com is the one allowed external script — the old site
// loaded it the same way (self-host constraint covers fonts/images).
export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
document.addEventListener('click', function (event) {
  var target = event.target;
  var cta = target instanceof Element ? target.closest('[data-ga-cta]') : null;
  if (cta) {
    gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: cta.getAttribute('data-ga-cta'),
    });
  }
});`}
      </Script>
    </>
  );
}
