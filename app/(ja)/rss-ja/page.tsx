import type { Metadata } from 'next';
import { RssPage } from '@/components/RssPage';
import { rssContent } from '@/content/rss';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'rss',
  lang: 'ja',
  title: rssContent.ja.title,
  description: rssContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <RssPage lang="ja" />;
}
