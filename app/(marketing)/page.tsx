import type { Metadata } from 'next';

import BeforeAfter from '@/components/home/BeforeAfter';
import ElevateCta from '@/components/home/ElevateCta';
import ExpertsSection from '@/components/home/ExpertsSection';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/');
}

export default function HomePage() {
  return (
    <>
      <PageJsonLd route="/" />
      <Hero />
      <ServicesSection />
      <BeforeAfter />
      <Testimonials />
      <ExpertsSection />
      <ElevateCta />
    </>
  );
}
