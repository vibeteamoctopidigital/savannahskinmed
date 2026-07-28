import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import SpecialsContent from '@/components/specials/SpecialsContent';
import { getSpecialsPageData } from '@/lib/data/specials';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/specials');
}

export const revalidate = 300;

export default async function AestheticSpecialsPage() {
  const { settings, cards, membershipPromo } = await getSpecialsPageData();

  return (
    <>
      <PageJsonLd route="/specials" />
      <PageHero
        title={settings.heroTitle}
        intro={settings.heroIntro}
        image={settings.heroImage}
        imageAlt={settings.heroImageAlt}
        position="center 30%"
      />
      <SpecialsContent
        offersHeading={settings.offersHeading}
        cards={cards}
        membershipPromo={membershipPromo}
      />
    </>
  );
}
