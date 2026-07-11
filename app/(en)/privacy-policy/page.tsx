import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { privacyContent } from '@/content/privacy';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'privacy-policy',
  lang: 'en',
  title: privacyContent.en.title,
  description: privacyContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <PrivacyPolicyPage lang="en" />;
}
