import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import InjectablesTreatments from '@/components/services/InjectablesTreatments';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/injectables-wrinkle-prevention');
}

const injectablesSlides: BeforeAfterSlide[] = [
  { before: 39, after: 40, procedure: 'Dysport' },
];

export default function InjectablesPage() {
  return (
    <>
      <PageJsonLd route="/injectables-wrinkle-prevention" isService />
      <ServiceHero
        eyebrow="SERVICES"
        title="Injectables & Wrinkle Prevention"
        intro="Subtle yet transformative enhancements designed to rejuvenate your natural beauty."
        image="/images/banner-6-bg.jpg"
        imageAlt="A client receiving an injectable treatment"
        position="center"
      />
      
      <InjectablesTreatments />
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={injectablesSlides}
        labelStyle="bottom"
      />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
