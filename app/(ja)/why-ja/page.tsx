import type { Metadata } from 'next';
import { WhyPage } from '@/components/WhyPage';
import { whyContent } from '@/content/why';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'why',
  lang: 'ja',
  title: whyContent.ja.title,
  description: whyContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <WhyPage lang="ja" />;
}
