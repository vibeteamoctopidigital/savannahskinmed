import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import CherryFinancing from '@/components/financing/CherryFinancing';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/financing-options');
}

export default function FinancingOptionsPage() {
  return (
    <>
      <PageJsonLd route="/financing-options" />
      <PageHero
        title="Financing Options"
        intro="Flexible ways to pay, so the treatment plan that is right for your skin is also right for your budget."
        image="/images/banner-13-bg.jpg"
        imageAlt="Savannah Age Management Medicine"
        position="center 40%"
      />

      <section className="section bg-white">
        <div className="shell-narrow">
          <CherryFinancing />
        </div>
      </section>
    </>
  );
}
