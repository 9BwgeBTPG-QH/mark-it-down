import type { Metadata } from 'next';
import { OkfPage } from '@/components/OkfPage';
import { okfContent } from '@/content/okf';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'okf',
  lang: 'ja',
  title: okfContent.ja.title,
  description: okfContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <OkfPage lang="ja" />;
}
