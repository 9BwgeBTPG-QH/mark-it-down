import type { Metadata } from 'next';
import { WelcomePage } from '@/components/WelcomePage';
import { welcomeContent } from '@/content/welcome';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'welcome',
  lang: 'en',
  title: welcomeContent.en.title,
  description: welcomeContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <WelcomePage lang="en" />;
}
