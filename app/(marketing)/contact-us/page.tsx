import type { Metadata } from 'next';

import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import PageHero from '@/components/ui/PageHero';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/contact-us');
}

export default function ContactPage() {
  return (
    <>
      <PageJsonLd route="/contact-us" />
      <PageHero
        title="Contact Us"
        intro="We're here to help you achieve glowing, healthy skin. Reach out today to book your medical-grade facial or to ask any questions!"
        image="/images/clinic_hero_2.jpg"
        imageAlt="The calm, welcoming waiting lounge at Savannah Age Management Medicine"
        position="center 45%"
      />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
