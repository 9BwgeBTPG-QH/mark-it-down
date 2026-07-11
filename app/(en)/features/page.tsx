import type { Metadata } from 'next';
import { FeaturesPage } from '@/components/FeaturesPage';
import { featuresContent } from '@/content/features';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'features',
  lang: 'en',
  title: featuresContent.en.title,
  description: featuresContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <FeaturesPage lang="en" />;
}
