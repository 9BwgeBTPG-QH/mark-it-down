import type { Metadata } from 'next';
import { IndexPage } from '@/components/IndexPage';
import { indexContent } from '@/content/index';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'index',
  lang: 'ja',
  title: indexContent.ja.title,
  description: indexContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <IndexPage lang="ja" />;
}
