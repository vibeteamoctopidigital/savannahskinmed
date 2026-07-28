import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import OfferingsList from '@/components/services/OfferingsList';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import FaqAccordion, { type FaqItem } from '@/components/services/FaqAccordion';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';
import { buildPageMetadata, FaqJsonLd, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/medical-grade-facials');
}

const facialSlides: BeforeAfterSlide[] = [
  { before: 21, after: 22, procedure: 'Medical-Grade Facial' },
  { before: 23, after: 24, procedure: 'Chemical Peel' },
];

const facialFaqs: FaqItem[] = [
  {
    question: 'What Are Medical-Grade Facials?',
    answer:
      'Medical-grade facials are highly customizable treatments that use clinical-grade products and tools. They are performed by trained medical aestheticians and are designed to produce more significant results than standard spa facials by targeting deeper skin layers and specific concerns.',
  },
  {
    question: 'How Do They Work?',
    answer:
      'These facials work by deeply exfoliating the skin, extracting impurities, and infusing targeted serums. Depending on the specific treatment, they can also stimulate collagen production, improve cellular turnover, and enhance the absorption of active ingredients.',
  },
  {
    question: 'Who Can Be Treated With Medical-Grade Facials?',
    answer:
      'They can treat a wide range of concerns including acne, hyperpigmentation, fine lines, uneven texture, dullness, and rosacea. We customize the treatment based on your unique skin profile.',
  },
];

export default function MedicalGradeFacialsPage() {
  return (
    <>
      <PageJsonLd route="/medical-grade-facials" isService />
      <FaqJsonLd faqs={facialFaqs} />
      <ServiceHero
        eyebrow="SERVICES"
        title="Medical-Grade Facials"
        intro="Revitalize your skin with advanced facial treatments designed to deliver lasting results."
        image="/images/banner-14-bg.jpg"
        imageAlt="A client receiving a medical-grade facial"
        position="center"
      />
      
      <OfferingsList />
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={facialSlides}
      />
      
      <FaqAccordion faqs={facialFaqs} />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
