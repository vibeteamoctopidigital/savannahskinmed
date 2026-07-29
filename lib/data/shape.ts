/**
 * Pure builder functions that reshape today's static content (`lib/site.ts`,
 * `lib/specialsData.ts`) into the exact shapes the DB-backed data-access
 * layer returns. `prisma/seed.ts` and the runtime fallback path (used when
 * Prisma can't reach a database) both call these same functions, so seed
 * data and fallback data are structurally incapable of drifting apart.
 */
import {
  footerServices,
  locations as staticLocations,
  quickLinks,
  site,
  socials,
} from '@/lib/site';
import { specialCards, type SpecialCard as StaticSpecialCard } from '@/lib/specialsData';

// ---------------------------------------------------------------------------
// Admin (seeded credentials, also used as the no-DB fallback login)
// ---------------------------------------------------------------------------

export const ADMIN_FALLBACK_EMAIL = 'admin@gmail.com';

/** bcrypt hash of "admin123" — the same value the seed script inserts for real. */
export const ADMIN_FALLBACK_PASSWORD_HASH =
  '$2b$10$5EyRELnNJzbA8kJo60EsUO2Z53fPGmZeTPZFi60S0u/wm7amf1A6a';

// ---------------------------------------------------------------------------
// Site settings (general + social + favicon + analytics + tracking codes)
// ---------------------------------------------------------------------------

export type SiteSettingsData = {
  name: string;
  description: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  address: string;
  bookingUrl: string;
  copyrightText: string;
  logoUrl: string;
  faviconUrl: string;
  googleAnalyticsId: string;
  metaPixelId: string;
  headerTrackingCode: string;
  footerTrackingCode: string;
};

export function buildSiteSettingsFallback(): SiteSettingsData {
  return {
    name: site.name,
    description:
      'Customized medical aesthetic solutions to enhance your glow and restore youthful skin. Medical-grade facials, laser treatments, injectables and IV therapy in Pooler and Statesboro, GA.',
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: site.email,
    emailHref: site.emailHref,
    address: staticLocations[0]?.address.join(', ') ?? '',
    bookingUrl: site.bookingUrl,
    copyrightText: 'Copyright © 2026 Savannah Age Management Medicine',
    logoUrl: '',
    faviconUrl: '',
    googleAnalyticsId: '',
    metaPixelId: '',
    headerTrackingCode: '',
    footerTrackingCode: '',
  };
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export type FooterHourEntry = { days: string; time: string };

export type FooterLocation = {
  city: string;
  badge?: string;
  addressLines: string[];
  hours: FooterHourEntry[];
  hoursShort: FooterHourEntry[];
};

export type FooterLink = { label: string; href: string };

export type FooterData = {
  site: {
    name: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
    bookingUrl: string;
    copyrightText: string;
  };
  socials: { label: string; href: string; icon: string }[];
  locations: FooterLocation[];
  quickLinks: FooterLink[];
  footerServices: FooterLink[];
};

export function buildFooterFallback(): FooterData {
  const settings = buildSiteSettingsFallback();
  return {
    site: {
      name: settings.name,
      phone: settings.phone,
      phoneHref: settings.phoneHref,
      email: settings.email,
      emailHref: settings.emailHref,
      bookingUrl: settings.bookingUrl,
      copyrightText: settings.copyrightText,
    },
    socials: socials.map((s) => ({ label: s.label, href: s.href, icon: s.icon })),
    locations: staticLocations.map((location) => ({
      city: location.city,
      badge: location.badge,
      addressLines: location.address,
      hours: location.hours,
      hoursShort: location.hoursShort,
    })),
    quickLinks: quickLinks.map((link) => ({ label: link.label, href: link.href })),
    footerServices: footerServices.map((link) => ({ label: link.label, href: link.href })),
  };
}

// ---------------------------------------------------------------------------
// Aesthetic Specials page
// ---------------------------------------------------------------------------

export type SpecialTierData = { label: string; detail: string };

export type SpecialCardData = {
  id: string;
  variant: 'TIERS' | 'STORY';
  image: string;
  imageAlt: string;
  title: string | null;
  eyebrow: string | null;
  headline: string | null;
  description: string | null;
  cta: string;
  tiers: SpecialTierData[];
};

export type SpecialsPageSettingsData = {
  heroTitle: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  offersHeading: string;
};

export type MembershipPromoData = {
  headingStart: string;
  headingEmphasis: string;
  headingEnd: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  image: string;
  bullets: string[];
};

function toSpecialCardData(card: StaticSpecialCard): SpecialCardData {
  const base = {
    id: card.id,
    variant: card.variant.toUpperCase() as 'TIERS' | 'STORY',
    image: card.image,
    imageAlt: card.imageAlt,
    title: 'title' in card ? card.title ?? null : null,
    eyebrow: 'eyebrow' in card ? card.eyebrow ?? null : null,
    cta: card.cta,
  };

  if (card.variant === 'tiers') {
    return {
      ...base,
      headline: null,
      description: null,
      tiers: card.tiers.map((tier) => ({ label: tier.label, detail: tier.detail })),
    };
  }

  return {
    ...base,
    headline: card.headline,
    description: card.description,
    tiers: [],
  };
}

export function buildSpecialsFallback(): SpecialCardData[] {
  return specialCards.map(toSpecialCardData);
}

export function buildSpecialsPageSettingsFallback(): SpecialsPageSettingsData {
  return {
    heroTitle: 'Aesthetic Specials',
    heroIntro: 'Treat yourself to exclusive offers on our most popular aesthetic services.',
    heroImage: '/images/banner-15-bg.jpg',
    heroImageAlt: 'Three clients smiling in white spa robes',
    offersHeading: 'Explore Our Offers',
  };
}

export function buildMembershipPromoFallback(): MembershipPromoData {
  return {
    headingStart: 'Aesthetic',
    headingEmphasis: 'Membership',
    headingEnd: 'Program',
    tagline: 'Exclusive Savings, Elevated Care',
    description:
      'Enjoy your favorite treatments with more flexibility and less upfront cost. Our membership program gives you access to preferred pricing and added value across a range of aesthetic services.',
    ctaLabel: 'Request More Details',
    image: '/images/grid-9-img.jpg',
    bullets: [
      'Members-only pricing on popular treatments',
      'Simple monthly payment structure',
      'Savings on sexual function and PRP add-ons',
    ],
  };
}

// ---------------------------------------------------------------------------
// Our Team / Experts
// ---------------------------------------------------------------------------

export type TeamMemberData = {
  id: string;
  name: string;
  role: string;
  highlight?: string;
  bio: string;
  image: string;
  imageAlt?: string;
  sortOrder: number;
  isActive: boolean;
};

export function buildTeamFallback(): TeamMemberData[] {
  return [
    {
      id: 'collins',
      name: 'Harry S. Collins, DO, FACOG, Medical Director',
      role: 'Medical Director',
      highlight: 'Top-Rated Savannah Medical Director',
      image: '/images/team-6-img.png',
      imageAlt: 'Harry S. Collins, DO, FACOG, Medical Director',
      sortOrder: 1,
      isActive: true,
      bio: `Dr. Harry Collins has been a leader in women's health and aesthetic medicine in Savannah for over 30 years. A graduate and prior affiliate of The Laser Vaginal Rejuvenation Institute of Los Angeles, he trained under Dr. David Matlock, pioneer of trademarked Laser Vaginal Rejuvenation.\n\nThroughout his career, Dr. Collins has been devoted to the study of hormone optimization and age management medicine. He had the opportunity to train and work alongside some of the most respected surgeons in the country at one of the most prestigious medical institutions, Walter Reed Army Medical Center. In 1984 he was the Command Physician, U.S. Military Support Element Grenada (Operation Urgent Fury). He retired from the U.S. Army Medical Corps as a Lt. Colonel.\n\nTrained and certified in Age Management Medicine, Dr. Collins brings Bio Identical Hormone Optimization to the Southeast, helping patients achieve optimal wellness and aesthetic goals.`,
    },
    {
      id: 'rebecca',
      name: 'Rebecca Speck',
      role: 'LEAD AESTHETICIAN / LASER SPECIALIST',
      highlight: '',
      image: '/images/team-11-img.png',
      imageAlt: 'Rebecca Speck',
      sortOrder: 2,
      isActive: true,
      bio: `Rebecca is a Licensed Aesthetician and Laser Specialist with a passion for helping her patients achieve their skincare goals. She brings extensive experience and a tailored approach to every treatment.\n\nShe believes that the best results are achieved through a combination of in-office treatments and a customized at-home skincare regimen. She works closely with each patient to develop a personalized plan that addresses their unique needs and concerns.\n\nRebecca is dedicated to continuing her education and staying up-to-date on the latest advancements in medical aesthetics. She is certified in a wide range of treatments, including laser hair removal, chemical peels, and microneedling, and is committed to providing her patients with the highest level of care.`,
    },
    {
      id: 'eseta',
      name: 'Eseta Johnson, MSN, FNP-C',
      role: 'NURSE PRACTITIONER',
      highlight: '',
      image: '/images/team-12-img.png',
      imageAlt: 'Eseta Johnson, MSN, FNP-C',
      sortOrder: 3,
      isActive: true,
      bio: `Eseta Johnson is a Family Nurse Practitioner with a deep dedication to patient care, aesthetic medicine, and wellness. She combines clinical precision with an artistic eye to help patients look and feel refreshed.\n\nWith extensive background in clinical patient care, Eseta excels at understanding individual patient goals and designing comprehensive aesthetic treatments. Her warm, empathetic approach ensures that every patient feels comfortable, heard, and supported throughout their aesthetic journey.\n\nShe specializes in customized cosmetic injectables, skin rejuvenation protocols, and wellness consultations, focusing on natural-looking enhancements that boost self-confidence and restore youthful radiance.`,
    },
    {
      id: 'sara',
      name: 'Sara Mallow, MSN, AGNP',
      role: 'NURSE PRACTITIONER',
      highlight: 'Top-Rated Savannah Nurse Practitioner',
      image: '/images/photo-content-10-img.jpg',
      imageAlt: 'Sara Mallow, MSN, AGNP',
      sortOrder: 4,
      isActive: true,
      bio: `Sara Mallow is an Adult-Gerontology Nurse Practitioner specializing in aesthetic medicine and age management. She is passionate about empowering patients through personalized, science-backed treatments.\n\nBringing years of clinical excellence to Savannah Skin and Med Spa, Sara emphasizes patient safety, comfort, and natural aesthetic outcomes. She takes the time to educate her clients, ensuring they understand their treatment options and feel confident in their skincare decisions.\n\nSara is skilled in advanced injectable techniques, dermal fillers, collagen-stimulating therapies, and customized skin revitalization programs designed to harmonize and enhance facial aesthetics.`,
    },
  ];
}

