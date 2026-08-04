import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import CherryFinancing from '@/components/financing/CherryFinancing';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';
import FinancingOptions from '@/components/FinancingOptions';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/financing-options');
}

export default function FinancingOptionsPage() {
  return (
    <>
      <PageJsonLd route="/financing-options" />
      <FinancingOptions/>
    </>
  );
}
