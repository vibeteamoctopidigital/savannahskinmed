import 'dotenv/config';
import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma';
import { HoursKind, FooterLinkGroup, SpecialCardVariant } from '../lib/generated/prisma/client';
import {
  ADMIN_FALLBACK_EMAIL,
  buildFooterFallback,
  buildMembershipPromoFallback,
  buildSiteSettingsFallback,
  buildSpecialsFallback,
  buildSpecialsPageSettingsFallback,
} from '../lib/data/shape';
import { seoRoutes } from '../lib/seoRoutes';

async function main() {
  console.log('Seeding admin user…');
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.upsert({
    where: { email: ADMIN_FALLBACK_EMAIL },
    update: {},
    create: { email: ADMIN_FALLBACK_EMAIL, passwordHash },
  });

  console.log('Seeding site settings…');
  const settingsData = buildSiteSettingsFallback();
  await prisma.siteSetting.upsert({
    where: { id: 'main' },
    update: settingsData,
    create: { id: 'main', ...settingsData },
  });

  console.log('Seeding footer content…');
  const footer = buildFooterFallback();

  await prisma.socialLink.deleteMany();
  await prisma.socialLink.createMany({
    data: footer.socials.map((s, i) => ({ ...s, sortOrder: i })),
  });

  await prisma.location.deleteMany();
  for (const [i, location] of footer.locations.entries()) {
    await prisma.location.create({
      data: {
        city: location.city,
        badge: location.badge,
        addressLines: location.addressLines,
        sortOrder: i,
        hours: {
          create: [
            ...location.hours.map((h, j) => ({ ...h, kind: HoursKind.FULL, sortOrder: j })),
            ...location.hoursShort.map((h, j) => ({
              ...h,
              kind: HoursKind.SHORT,
              sortOrder: j,
            })),
          ],
        },
      },
    });
  }

  await prisma.footerNavLink.deleteMany();
  await prisma.footerNavLink.createMany({
    data: [
      ...footer.quickLinks.map((l, i) => ({
        ...l,
        group: FooterLinkGroup.QUICK_LINK,
        sortOrder: i,
      })),
      ...footer.footerServices.map((l, i) => ({
        ...l,
        group: FooterLinkGroup.FOOTER_SERVICE,
        sortOrder: i,
      })),
    ],
  });

  console.log('Seeding specials page…');
  const settings = buildSpecialsPageSettingsFallback();
  await prisma.specialsPageSettings.upsert({
    where: { id: 'main' },
    update: settings,
    create: { id: 'main', ...settings },
  });

  const cards = buildSpecialsFallback();
  await prisma.specialCard.deleteMany();
  for (const [i, card] of cards.entries()) {
    await prisma.specialCard.create({
      data: {
        id: card.id,
        variant: card.variant === 'TIERS' ? SpecialCardVariant.TIERS : SpecialCardVariant.STORY,
        image: card.image,
        imageAlt: card.imageAlt,
        title: card.title,
        eyebrow: card.eyebrow,
        headline: card.headline,
        description: card.description,
        cta: card.cta,
        sortOrder: i,
        tiers: { create: card.tiers.map((t, j) => ({ ...t, sortOrder: j })) },
      },
    });
  }

  const promo = buildMembershipPromoFallback();
  await prisma.membershipPromo.upsert({
    where: { id: 'main' },
    update: {
      headingStart: promo.headingStart,
      headingEmphasis: promo.headingEmphasis,
      headingEnd: promo.headingEnd,
      tagline: promo.tagline,
      description: promo.description,
      ctaLabel: promo.ctaLabel,
      image: promo.image,
    },
    create: {
      id: 'main',
      headingStart: promo.headingStart,
      headingEmphasis: promo.headingEmphasis,
      headingEnd: promo.headingEnd,
      tagline: promo.tagline,
      description: promo.description,
      ctaLabel: promo.ctaLabel,
      image: promo.image,
    },
  });
  await prisma.membershipPromoBullet.deleteMany();
  await prisma.membershipPromoBullet.createMany({
    data: promo.bullets.map((text, i) => ({ text, sortOrder: i, promoId: 'main' })),
  });

  console.log('Ensuring SEO rows exist for every known route…');
  for (const { route } of seoRoutes) {
    const existing = await prisma.pageSeo.findUnique({ where: { route } });
    if (!existing) {
      await prisma.pageSeo.create({ data: { route } });
    }
  }

  console.log('Seed complete.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
