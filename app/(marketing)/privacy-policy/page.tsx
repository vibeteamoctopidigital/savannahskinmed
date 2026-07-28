import type { Metadata } from 'next';

import SimplePage from '@/components/ui/SimplePage';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/privacy-policy');
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageJsonLd route="/privacy-policy" />
      <SimplePage
        title="Privacy Policy"
        intro="How we collect, use and protect the information you share with us."
        body={[
          'We collect only the information needed to respond to your enquiry and provide care — such as your name, contact details and the message you send through this website.',
          'We do not sell your information. Health information is handled in line with applicable privacy regulations and is shared only with the members of your care team.',
          'If you would like to know what information we hold about you, or would like it removed, please contact the office.',
        ]}
        cta={{ label: 'Contact The Office', href: '/contact-us' }}
      />
    </>
  );
}
