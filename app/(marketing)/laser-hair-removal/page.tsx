import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import LaserOfferingsList from '@/components/services/LaserOfferingsList';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import FaqAccordion, { type FaqItem } from '@/components/services/FaqAccordion';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, FaqJsonLd, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/laser-hair-removal');
}

const laserSlides: BeforeAfterSlide[] = [
  { before: 19, after: 20, procedure: 'Laser Hair Removal' },
];

const laserFaqs: FaqItem[] = [
  {
    question: 'What Is Laser Hair Removal?',
    answer:
      'Laser hair removal is a cosmetic procedure that uses concentrated light beams to target and destroy hair follicles, preventing or significantly reducing future hair growth. During the treatment, a laser emits pulses of light that are absorbed by the pigment in the hair, which damages the hair follicle and inhibits or delays hair regrowth.',
  },
  {
    question: 'Will This Help With Hormonal Hair Growth?',
    answer:
      'Yes, Laser hair removal can help manage stubborn hair growth as a result of hormone adjustments.',
  },
  {
    question: 'Does Laser Hair Removal Hurt?',
    answer:
      'Laser hair removal technology has advanced significantly, and many patients sit through laser hair removal sessions comfortably. Our clinical team can apply a numbing cream to the target area in advance of treatment if pain is of concern.',
  },
];

export default function LaserHairRemovalPage() {
  return (
    <>
      <PageJsonLd route="/laser-hair-removal" isService />
      <FaqJsonLd faqs={laserFaqs} />
      <ServiceHero
        eyebrow="SERVICES"
        title="Laser Hair Removal"
        intro="State-of-the-art laser hair removal services designed to achieve a flawless, hair-free look."
        image="/images/banner-4-bg.jpg"
        imageAlt="A client receiving laser hair removal treatment"
        position="center"
      />
      
      <LaserOfferingsList />
      
      <BeforeAfter 
        eyebrow="WHAT TO EXPECT BEFORE AND AFTER"
        title="Results You Can See, Confidence You Can Feel"
        slides={laserSlides}
        labelStyle="pill"
      />
      
      <FaqAccordion faqs={laserFaqs} />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
