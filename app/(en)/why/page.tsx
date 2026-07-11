import type { Metadata } from 'next';
import { WhyPage } from '@/components/WhyPage';
import { whyContent } from '@/content/why';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'why',
  lang: 'en',
  title: whyContent.en.title,
  description: whyContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <WhyPage lang="en" />;
}
