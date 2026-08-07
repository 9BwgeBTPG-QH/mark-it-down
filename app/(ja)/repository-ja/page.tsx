import type { Metadata } from 'next';
import { RepositoryPage } from '@/components/RepositoryPage';
import { repositoryContent } from '@/content/repository';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'repository',
  lang: 'ja',
  title: repositoryContent.ja.title,
  description: repositoryContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <RepositoryPage lang="ja" />;
}
