import type { Metadata } from 'next';
import { IndexPage } from '@/components/IndexPage';
import { indexContent } from '@/content/index';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'index',
  lang: 'en',
  title: indexContent.en.title,
  description: indexContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <IndexPage lang="en" />;
}
