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
