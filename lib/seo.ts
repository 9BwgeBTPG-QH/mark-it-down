import type { Metadata } from 'next';
import type { Lang } from '@/content/index';
import { navHref } from '@/content/shared';

// Absolute origin for canonical / hreflang / OGP resolution. The static
// export has no server to infer this from, so it's a literal constant
// matching the deployed GitHub Pages custom domain (CNAME).
export const SITE_URL = 'https://markitdown.reduktion.dev';

interface BuildPageMetadataArgs {
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  // Bare filename as referenced by the current production site's og:image
  // (e.g. 'en-dark.png'), not a path — see ogImage resolution note below.
  ogImage: string;
}

// chorme_mark-it-down#1593 Phase 4 runs an automated SEO parity diff against
// doc/audit/seo-baseline-2026-07-11.json (title / description / hreflang /
// OGP / JSON-LD, extracted by doc/audit/extract-seo-baseline.mjs). This
// helper is the single place that produces those fields for every page so
// the diff has one source of truth to check.
//
// alternates.canonical is a deliberate NEW addition — the old static site
// emitted no <link rel="canonical">. hreflang (en / ja / x-default) mirrors
// the baseline's absolute-URL format exactly.
//
// ogImage is resolved against metadataBase like every other relative URL in
// this metadata object, so the emitted og:image becomes an absolute URL
// (e.g. `${SITE_URL}/en-dark.png`) rather than the baseline's bare filename.
// Both resolve to the same deployed asset (docs/en-dark.png is untouched by
// the Next.js build — sync-docs.mjs only copies files that exist in out/),
// so this is treated as an equivalent, not a regression.
export function buildPageMetadata({ slug, lang, title, description, ogImage }: BuildPageMetadataArgs): Metadata {
  const enPath = navHref(slug, 'en');
  const jaPath = navHref(slug, 'ja');

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: navHref(slug, lang),
      languages: {
        en: enPath,
        ja: jaPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      images: [ogImage],
    },
  };
}
