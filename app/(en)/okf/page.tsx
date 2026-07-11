import type { Metadata } from 'next';
import { OkfPage } from '@/components/OkfPage';
import { okfContent } from '@/content/okf';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'okf',
  lang: 'en',
  title: okfContent.en.title,
  description: okfContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <OkfPage lang="en" />;
}
