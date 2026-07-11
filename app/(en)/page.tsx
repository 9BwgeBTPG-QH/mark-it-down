import type { Metadata } from 'next';
import { IndexPage } from '@/components/IndexPage';
import { indexContent } from '@/content/index';

export const metadata: Metadata = {
  title: indexContent.en.title,
  description: indexContent.en.description,
};

export default function Page() {
  return <IndexPage lang="en" />;
}
