import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import LaserRejuvenationOfferings from '@/components/services/LaserRejuvenationOfferings';
import LaserRejuvenationConsultation from '@/components/services/LaserRejuvenationConsultation';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import FaqAccordion, { type FaqItem } from '@/components/services/FaqAccordion';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, FaqJsonLd, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/laser-skin-rejuvenation');
}

const laserRejuvenationSlides: BeforeAfterSlide[] = [
  { before: 55, after: 56, procedure: 'CO2 Laser Resurfacing' },
  { before: 57, after: 58, procedure: 'CO2 Laser Resurfacing' },
  { before: 25, after: 26, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 27, after: 28, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 29, after: 30, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 31, after: 32, procedure: 'Microneedling' },
  { before: 33, after: 34, procedure: 'Microneedling' },
];

const laserRejuvenationFaqs: FaqItem[] = [
  {
    question: 'What is Laser Skin Rejuvenation?',
    answer:
      'Laser skin rejuvenation refers to a variety of non-surgical treatments that use laser light energy to improve the appearance of the skin. These treatments can target specific concerns like sun damage, wrinkles, acne scars, and uneven pigmentation by either removing damaged outer layers of skin or stimulating collagen production beneath the surface.',
  },
  {
    question: 'What Is The Downtime For Laser Treatments?',
    answer:
      'The downtime varies significantly depending on the specific laser used. Non-ablative lasers often have minimal to no downtime, with some temporary redness. Ablative lasers (like CO2), which offer more dramatic results, require more downtime as the skin heals, typically ranging from a few days to a week or more of recovery.',
  },
  {
    question: 'Is Laser Skin Rejuvenation Painful?',
    answer:
      'Most patients tolerate laser treatments well. We use topical numbing creams and specialized cooling devices to ensure your comfort during the procedure. The sensation is often described as a warm prickling or the snapping of a rubber band against the skin. We will discuss pain management options tailored to your specific treatment during your consultation.',
  },
];

export default function LaserSkinRejuvenationPage() {
  return (
    <>
      <PageJsonLd route="/laser-skin-rejuvenation" isService />
      <FaqJsonLd faqs={laserRejuvenationFaqs} />
      <ServiceHero
        eyebrow="SERVICES"
        title="Laser Skin Rejuvenation"
        intro="Designed to refine, refresh, and restore your skin's youthful glow."
        image="/images/banner-7-bg.jpg"
        imageAlt="A client receiving laser skin rejuvenation treatment"
        position="center"
      />
      
      <LaserRejuvenationOfferings />
      
      <LaserRejuvenationConsultation />
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={laserRejuvenationSlides}
        labelStyle="bottom"
      />
      
      <FaqAccordion faqs={laserRejuvenationFaqs} noTopPadding />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
