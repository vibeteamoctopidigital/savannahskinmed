import type { Metadata } from 'next';

import MembershipHero from '@/components/membership/MembershipHero';
import BeautyWithoutGuesswork from '@/components/membership/BeautyWithoutGuesswork';
import MemberBenefits from '@/components/membership/MemberBenefits';
import MembershipOptions from '@/components/membership/MembershipOptions';
import AdditionalBenefits from '@/components/membership/AdditionalBenefits';
import HowItWorks from '@/components/membership/HowItWorks';
import MembershipCta from '@/components/membership/MembershipCta';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/aesthetic-membership-program');
}

export default function AestheticMembershipProgramPage() {
  return (
    <main>
      <PageJsonLd route="/aesthetic-membership-program" isService />
      <MembershipHero />
      <BeautyWithoutGuesswork />
      <MemberBenefits />
      <MembershipOptions />
      <AdditionalBenefits />
      <HowItWorks />
      <MembershipCta />
    </main>
  );
}
