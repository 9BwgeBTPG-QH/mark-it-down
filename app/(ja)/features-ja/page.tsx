import type { Metadata } from 'next';
import { FeaturesPage } from '@/components/FeaturesPage';
import { featuresContent } from '@/content/features';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'features',
  lang: 'ja',
  title: featuresContent.ja.title,
  description: featuresContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <FeaturesPage lang="ja" />;
}
