import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import IvInfusionContent from '@/components/services/IvInfusionContent';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/iv-infusion-therapy-vitamin-injections');
}

export default function IvInfusionTherapyPage() {
  return (
    <>
      <PageJsonLd route="/iv-infusion-therapy-vitamin-injections" isService />
      <ServiceHero
        eyebrow="SERVICES"
        title="IV Infusion Therapy & Vitamin Injections"
        intro="Provides an efficient and luxurious way to replenish your body with vital nutrients."
        image="/images/banner-9-bg.jpg"
        imageAlt="IV Infusion Therapy & Vitamin Injections"
        position="center"
      />
      
      <IvInfusionContent />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
