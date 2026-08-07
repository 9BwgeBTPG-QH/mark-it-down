import type { Metadata } from 'next';
import { RepositoryPage } from '@/components/RepositoryPage';
import { repositoryContent } from '@/content/repository';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'repository',
  lang: 'en',
  title: repositoryContent.en.title,
  description: repositoryContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <RepositoryPage lang="en" />;
}
