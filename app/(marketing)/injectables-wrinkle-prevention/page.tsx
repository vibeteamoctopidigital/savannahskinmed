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
  { before: 55, after: 56, procedure: 'CO2 Laser Resurfacing' },
  { before: 57, after: 58, procedure: 'CO2 Laser Resurfacing' },
  { before: 25, after: 26, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 27, after: 28, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 29, after: 30, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 31, after: 32, procedure: 'Microneedling' },
  { before: 33, after: 34, procedure: 'Microneedling' },
];
export default function InjectablesPage() {
  return (
    <section className='bg-[#F1F3EC]'>
      <PageJsonLd route="/injectables-wrinkle-prevention" isService />
      <ServiceHero
        eyebrow="SERVICES"
        title="Injectables & Wrinkle Prevention"
        intro="Subtle yet transformative enhancements, designed to rejuvenate your natural beauty."
        image="/images/banner-6-bg.jpg"
        imageAlt="A client receiving an injectable treatment"
        position="center 35%"
      />
      <InjectablesTreatments />
      
      {/* <InjectablesTreatments /> */}
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={injectablesSlides}
        labelStyle="bottom"
        bg='bg-[#F1F3EC]'
      />
      
      <Testimonials width='full'  imageUrl='https://res.cloudinary.com/khs2rcsr/image/upload/v1785839017/testimonial-bg_cchaq8.jpg'/>
      
      <ElevateCta />
    </section>
  );
}
