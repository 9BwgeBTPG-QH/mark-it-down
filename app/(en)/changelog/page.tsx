import type { Metadata } from 'next';
import { ChangelogPage } from '@/components/ChangelogPage';
import { changelogContent } from '@/content/changelog';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'changelog',
  lang: 'en',
  title: changelogContent.en.title,
  description: changelogContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <ChangelogPage lang="en" />;
}
