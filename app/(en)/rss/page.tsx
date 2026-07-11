import type { Metadata } from 'next';
import { RssPage } from '@/components/RssPage';
import { rssContent } from '@/content/rss';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'rss',
  lang: 'en',
  title: rssContent.en.title,
  description: rssContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <RssPage lang="en" />;
}
