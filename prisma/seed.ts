import 'dotenv/config';
import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma';
import { HoursKind, FooterLinkGroup, SpecialCardVariant } from '../lib/generated/prisma_v2/client';
import {
  ADMIN_FALLBACK_EMAIL,
  buildFooterFallback,
  buildMembershipPromoFallback,
  buildSiteSettingsFallback,
  buildSpecialsFallback,
  buildSpecialsPageSettingsFallback,
  buildTeamFallback,
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

  await prisma.locationHours.deleteMany();
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
            ...location.hours.map((h: { days: string; time: string }, j: number) => ({
              ...h,
              kind: HoursKind.FULL,
              sortOrder: j,
            })),
            ...location.hoursShort.map((h: { days: string; time: string }, j: number) => ({
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
        tiers: {
          create: card.tiers?.map((tier, j) => ({
            label: tier.label,
            detail: tier.detail,
            sortOrder: j,
          })),
        },
      },
    });
  }

  console.log('Seeding membership promo…');
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

  console.log('Seeding team members…');
  const teamMembers = buildTeamFallback();
  await prisma.teamMember.deleteMany();
  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: {
        id: member.id,
        name: member.name,
        role: member.role,
        highlight: member.highlight || '',
        bio: member.bio,
        image: member.image,
        imageAlt: member.imageAlt || member.name,
        sortOrder: member.sortOrder,
        isActive: member.isActive,
      },
    });
  }

  console.log('Seeding blog posts…');
  const blogPosts = [
    {
      title: 'The Science Behind Medical-Grade Microneedling & RF Treatments',
      slug: 'science-behind-medical-grade-microneedling-rf',
      category: 'Aesthetic Medicine',
      tags: 'Microneedling, Radiofrequency, Collagen, Skin Rejuvenation',
      author: 'Savannah Age Management Medicine Team',
      readingTime: 6,
      excerpt:
        'Discover how radiofrequency microneedling stimulates deep collagen remodeling to smooth fine lines, tighten lax skin, and restore youthful radiance.',
      image: '/images/photo-content-10-img.jpg',
      imageAlt: 'Medical-grade treatment session',
      metaTitle: 'The Science of RF Microneedling | Savannah Age Management Medicine',
      metaDescription:
        'Discover how radiofrequency microneedling stimulates deep collagen remodeling to smooth fine lines, tighten lax skin, and restore youthful radiance.',
      keywords: 'RF Microneedling, Collagen Remodeling, Savannah Med Spa, Skin Tightening',
      description: `Modern aesthetic medicine has advanced far beyond surface-level skin creams. Today, radiofrequency (RF) microneedling stands as one of the most clinically validated methods for restoring skin elasticity and tone from within.\n\nHow Radiofrequency Stimulates Deep Remodeling:\nBy delivering controlled micro-injuries alongside precise radiofrequency energy deep into the dermis, the treatment triggers the body's natural wound-healing response. This dual-action process stimulates fibroblasts to generate fresh collagen and elastin fibers without damaging the outer layer of skin.\n\nKey Benefits of RF Microneedling:\n1. Significant reduction in fine lines, deep rhytids, and wrinkles.\n2. Improved texture and smoothing of acne scars or uneven pigmentation.\n3. Natural skin tightening along the jawline, neck, and delicate orbital areas.\n4. Minimal social downtime compared to aggressive laser resurfacing.\n\nWhat to Expect During Your Consultation:\nAt Savannah Age Management Medicine, we evaluate your skin thickness, sun damage profile, and aesthetic goals to tailor the exact needle depth and RF energy for optimal, natural-looking results.`,
    },
    {
      title: 'HydraFacial vs. Traditional Facials: Which Is Right for Your Skin Goal?',
      slug: 'hydrafacial-vs-traditional-facials-skin-goals',
      category: 'Skin Care',
      tags: 'HydraFacial, Skincare, Exfoliation, Deep Cleansing',
      author: 'Savannah Age Management Medicine Team',
      readingTime: 5,
      excerpt:
        'Wondering why medical-grade HydraFacials are transforming skincare regimens? Here is how vortex extraction compares to traditional spa treatments.',
      image: '/images/photo-content-11-img.jpg',
      imageAlt: 'HydraFacial skin treatment',
      metaTitle: 'HydraFacial vs. Traditional Spa Facials | Savannah Med Spa',
      metaDescription:
        'Compare medical-grade HydraFacials with traditional spa facials to find the best deep cleansing and hydration regimen for your skin type.',
      keywords: 'HydraFacial, Facial Extraction, Savannah Skin Care, Antioxidant Infusion',
      description: `When choosing a facial treatment, many patients wonder whether a traditional spa facial or a medical-grade HydraFacial is best suited for their skincare routine. While both offer relaxation, their mechanisms of action and clinical outcomes differ substantially.\n\nThe HydraFacial Vortex Advantage:\nUnlike manual extractions that can cause tissue trauma or lingering redness, the HydraFacial uses patented vortex-fusion technology. This vacuum-powered spiral tip gently clears congested pores while simultaneously infusing nourishing hyaluronic acid, peptides, and antioxidants.\n\n3 Core Steps of an Advanced HydraFacial:\n1. Cleanse & Peel: Gentle chemical exfoliation with glycolic and salicylic acid reveals a fresh layer of healthy skin.\n2. Extract & Hydrate: Painless suction clears sebum and debris while drenching the dermis in intense moisturizers.\n3. Fuse & Protect: Targeted serums elevate luminosity and protect against environmental oxidative stress.\n\nLong-Term Maintenance:\nFor patients seeking reliable glow before events or looking to treat chronic congestion without downtime, HydraFacial offers consistent, reproducible results every single visit.`,
    },
    {
      title: 'Understanding BOTOX & Dermal Fillers: A Complete Patient Guide',
      slug: 'understanding-botox-dermal-fillers-patient-guide',
      category: 'Injectables',
      tags: 'BOTOX, Dermal Fillers, Neuromodulators, Anti-Aging, Facial Rejuvenation',
      author: 'Savannah Age Management Medicine Team',
      readingTime: 7,
      excerpt:
        'Unsure about the differences between neuromodulators and dermal fillers? Learn how combining both can achieve subtle, natural facial rejuvenation.',
      image: '/images/photo-content-12-img.jpg',
      imageAlt: 'Precision facial injectable treatment',
      metaTitle: 'BOTOX vs. Dermal Fillers Guide | Savannah Age Management Medicine',
      metaDescription:
        'Learn the differences between neuromodulators like BOTOX and hyaluronic acid dermal fillers for subtle, balanced facial rejuvenation.',
      keywords: 'BOTOX, Dermal Fillers, Juvederm, Savannah Injectables, Wrinkle Treatment',
      description: `Neuromodulators and dermal fillers are frequently mentioned together, yet they serve entirely complementary roles in non-surgical facial rejuvenation. Understanding how they work can help you approach your treatment plan with confidence.\n\nNeuromodulators (BOTOX) for Dynamic Wrinkles:\nDynamic lines form from repeated muscle contractions—such as frowning, squinting, or raising your eyebrows. BOTOX temporarily relaxes these target underlying facial muscles, allowing the overlying skin to smooth out and preventing deeper static folds from setting in.\n\nDermal Fillers for Volume & Contouring:\nAs we mature, facial volume diminishes due to collagen loss and bone resorption. Hyaluronic acid dermal fillers gently restore youthful contours, soften nasolabial folds, and enhance lip or cheek symmetry without looking over-filled.\n\nThe Full-Face Rejuvenation Approach:\nWhen administered by skilled medical providers, combining neuromodulators for expression lines with fillers for structural support produces harmonious, refreshed results that respect your natural anatomy.`,
    },
    {
      title: 'Why Personalized Skin Care & Anti-Aging Medicine Go Hand in Hand',
      slug: 'personalized-skin-care-and-anti-aging-medicine',
      category: 'Anti-Aging',
      tags: 'Anti-Aging, Wellness, Bio-Identical, Holistic Skin Health',
      author: 'Savannah Age Management Medicine Team',
      readingTime: 5,
      excerpt:
        'True aesthetic vitality starts from within. Explore our integrative approach to aging management, combining bio-identical wellness with skin health.',
      image: '/images/clinic-hero.jpg',
      imageAlt: 'Savannah Age Management Medicine clinic interior',
      metaTitle: 'Integrative Anti-Aging & Skin Care | Savannah Age Management',
      metaDescription:
        'Explore how integrating internal age management medicine with personalized aesthetic treatments creates lasting skin vitality and wellness.',
      keywords: 'Anti-Aging Medicine, Personalized Skincare, Savannah Age Management, Skin Vitality',
      description: `At Savannah Age Management Medicine, we believe that true aesthetic excellence is not achieved by treating the surface alone. Our skin is a direct reflection of our internal vitality, cellular health, and hormonal balance.\n\nThe Integrative Care Model:\nWhy apply topical treatments to stressed, depleted skin without addressing internal wellness? By pairing advanced aesthetic medicine—such as RF microneedling and lasers—with personalized metabolic and age-management protocols, patients achieve far more resilient, glowing skin.\n\n3 Pillars of Lasting Vitality:\n1. Targeted Cellular Nutrition & Hydration: Supporting collagen synthesis through optimal micronutrient balance.\n2. Medical-Grade Skincare Regimens: Using active retinoids, peptides, and vitamin C formulations chosen for your biology.\n3. Customized Aesthetic Interventions: Selecting treatments that respect your skin type and natural aging trajectory.\n\nYour Personalized Plan:\nEvery journey at our Savannah clinic begins with an in-depth dialogue about your goals, lifestyle, and aesthetic preferences.`,
    },
  ];
  for (const post of blogPosts) {
    const existing = await prisma.blogPost.findFirst({
      where: { OR: [{ slug: post.slug }, { title: post.title }] },
    });
    if (existing) {
      await prisma.blogPost.update({ where: { id: existing.id }, data: post });
    } else {
      await prisma.blogPost.create({ data: post });
    }
  }

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
