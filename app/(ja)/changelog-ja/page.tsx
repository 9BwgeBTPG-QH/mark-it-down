import type { Metadata } from 'next';
import { ChangelogPage } from '@/components/ChangelogPage';
import { changelogContent } from '@/content/changelog';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'changelog',
  lang: 'ja',
  title: changelogContent.ja.title,
  description: changelogContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <ChangelogPage lang="ja" />;
}
