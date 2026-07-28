import { prisma } from '@/lib/prisma';
import {
  buildMembershipPromoFallback,
  buildSpecialsFallback,
  buildSpecialsPageSettingsFallback,
  type MembershipPromoData,
  type SpecialCardData,
  type SpecialsPageSettingsData,
} from '@/lib/data/shape';

export type SpecialsPageData = {
  settings: SpecialsPageSettingsData;
  cards: SpecialCardData[];
  membershipPromo: MembershipPromoData;
};

export async function getSpecialsPageData(): Promise<SpecialsPageData> {
  try {
    const [settings, cards, promo] = await Promise.all([
      prisma.specialsPageSettings.findUniqueOrThrow({ where: { id: 'main' } }),
      prisma.specialCard.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: 'asc' },
        include: { tiers: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.membershipPromo.findUniqueOrThrow({
        where: { id: 'main' },
        include: { bullets: { orderBy: { sortOrder: 'asc' } } },
      }),
    ]);

    return {
      settings: {
        heroTitle: settings.heroTitle,
        heroIntro: settings.heroIntro,
        heroImage: settings.heroImage,
        heroImageAlt: settings.heroImageAlt,
        offersHeading: settings.offersHeading,
      },
      cards: cards.map((card) => ({
        id: card.id,
        variant: card.variant,
        image: card.image,
        imageAlt: card.imageAlt,
        title: card.title,
        eyebrow: card.eyebrow,
        headline: card.headline,
        description: card.description,
        cta: card.cta,
        tiers: card.tiers.map((t) => ({ label: t.label, detail: t.detail })),
      })),
      membershipPromo: {
        headingStart: promo.headingStart,
        headingEmphasis: promo.headingEmphasis,
        headingEnd: promo.headingEnd,
        tagline: promo.tagline,
        description: promo.description,
        ctaLabel: promo.ctaLabel,
        image: promo.image,
        bullets: promo.bullets.map((b) => b.text),
      },
    };
  } catch {
    return {
      settings: buildSpecialsPageSettingsFallback(),
      cards: buildSpecialsFallback(),
      membershipPromo: buildMembershipPromoFallback(),
    };
  }
}

export async function findSpecialCardById(id: string) {
  try {
    return await prisma.specialCard.findUnique({ where: { id } });
  } catch {
    return null;
  }
}
