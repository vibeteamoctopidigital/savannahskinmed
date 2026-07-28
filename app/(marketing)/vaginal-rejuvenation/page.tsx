import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import VaginalRejuvenationOfferings from '@/components/services/VaginalRejuvenationOfferings';
import DrCollinsProfile from '@/components/services/DrCollinsProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/vaginal-rejuvenation');
}

export default function VaginalRejuvenationPage() {
  return (
    <>
      <PageJsonLd route="/vaginal-rejuvenation" isService />
      <ServiceHero
        eyebrow="SERVICES"
        title="Vaginal Rejuvenation"
        intro="A discreet and effective solution to restore comfort, confidence, and intimacy."
        image="/images/banner-10-bg.jpg"
        imageAlt="Vaginal Rejuvenation"
        position="center"
      />
      
      <VaginalRejuvenationOfferings />
      
      <DrCollinsProfile />

      <Testimonials />

      <ElevateCta />
    </>
  );
}
