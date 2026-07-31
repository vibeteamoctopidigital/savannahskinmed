/**
 * Pure builder functions that reshape today's static content (`lib/site.ts`,
 * `lib/specialsData.ts`) into the exact shapes the DB-backed data-access
 * layer returns for runtime fallback paths.
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
    faviconUrl: '/images/fab.png',
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
      role: 'Age Management Medicine Specialist',
      highlight: '',
      image: '/images/team-6-img.png',
      imageAlt: 'Harry S. Collins, DO, FACOG, Medical Director',
      sortOrder: 1,
      isActive: true,
      bio: `Doctor Harry Collins is a Life Fellow of the American College of Obstetricians and Gynecologists. Dr. Collins received his certification in Age Management Medicine with the nationally renowned Cenegenics Medical Institute. Cenegenics' certification in Age Management Medicine is jointly sponsored by Cenegenics Education and Research Foundation (CERF) and the Foundation for Care Management in Las Vegas, Nevada. CERF and the Foundation for Care Management are accredited with honors by seven sponsoring organizations including the American Medical Association and American Board of Medical Specialties. He graduated from the University of Colorado (Denver) with distinction, earning a BA in biology. He went on to earn his Doctor of Osteopathic Medicine degree from Kansas City University of Medicine and Biosciences. After completing an internship in family medicine at Womack Army Medical Center (Fort Bragg, North Carolina), he completed a residency in obstetrics and gynecology at Walter Reed Army Medical Center in Washington, DC.\n\nDr. Collins is a graduate and prior affiliate of The Laser Vaginal Rejuvenation Institute of Los Angeles, training under Dr. David Matlock (Dr. 90210) who pioneered the trademarked procedure Laser Vaginal Rejuvenation. Throughout his medical career, Dr. Collins has been devoted to the study of hormone optimization and age management medicine. Dr. Collins has had the opportunity to train and work alongside some of the most respected surgeons in the country at one of the most prestigious medical institutions, Walter Reed Army Medical Center. In 1984 he was the Command Physician, U.S. Military Support Element Grenada (Operation Urgent Fury). He retired from the U.S. Army Medical Corps as a Lt. Colonel. Trained and certified in Age Management Medicine, Dr. Collins brings Bio Identical Hormone Optimization to the Southeast.`,
    },
    {
      id: 'rebecca',
      name: 'Rebecca Spacek',
      role: 'Laser Practitioner & Aesthetician',
      highlight: '',
      image: '/images/photo-content-10-img.jpg',
      imageAlt: 'Rebecca Spacek',
      sortOrder: 2,
      isActive: true,
      bio: `Rebecca Spacek is an Assistant Cosmetic Laser Practitioner, a Master Cosmetologist, and has been a professional Aesthetician and Certified Lasographer for 22 years.\n\nShe is licensed in the State of Georgia and studied at the Scottsdale's Institute for Medical Aesthetics in Arizona. Becca began her professional career as an Assistant Cosmetic Laser Practitioner and Aesthetician in Savannah and has been helping to establish multiple med spas here in the local area. She is most proud of her work at Cannon Plastic and Reconstructive Surgery and Cannon MedSpa where she worked closely with cancer patients. Becca provided these vulnerable patients with treatment plans that helped rid them of the scarring caused by radiation treatments and surgeries. The services Becca provides helped boost the confidence of her patients while ensuring they remained completely comfortable during her services. Becca holds 12 different certificates, loves her work and prides herself on getting outstanding results for her patients.`,
    },
    {
      id: 'evelia',
      name: 'Evelia Johnsen, MSN, FNP-C',
      role: 'Nurse Injector',
      highlight: '',
      image: '/images/team-11-img.png',
      imageAlt: 'Evelia Johnsen, MSN, FNP-C',
      sortOrder: 3,
      isActive: true,
      bio: `Evelia Johnsen is a Family Practice Nurse Practitioner, veteran, and advanced aesthetics professional with a deep commitment to helping individuals feel balanced, confident, and cared for at every stage of life. Her career began in the military as a Combat Medic with her last few years spent as a Flight Medic. There, she developed exceptional skill, precision, and composure in high-pressure environments. She later brought that same level of expertise into civilian healthcare as an Emergency Room Nurse before advancing her role as a Nurse Practitioner.\n\nToday, Evelia specializes in bioidentical hormone therapy and aesthetic medicine. While she loves treating everyone, she has a focused interest in supporting women through the complexities of perimenopause and menopause. Evelia's work is rooted not only in clinical expertise but also in deeply personal experience. She witnessed firsthand the effects of menopause and breast cancer through her mother's journey, who after courageously fighting breast cancer in her early 50s, came out of remission in her mid-60s and succumbed to her illness at the age of 68. This experience continues to shape Evelia's approach to care, fueling her passion for helping women navigate hormonal changes with knowledge, compassion, and highly personalized support so no woman feels alone in her journey. She has completed advanced training in hormone optimization through BioTE, Empire Medical, and WorldLink Medical, and has advanced training in neurotoxin modulators, dermal fillers, and comprehensive skin health.\n\nHer approach blends medical precision with a refined aesthetic eye, delivering natural, elegant results that enhance - not change - her patients' appearance. She believes that, for the menopausal woman, this is not something one simply has to “get through,” and that with the right support, it can be a time of renewal, confidence, and empowerment. Evelia hopes to provide an exceptional experience. That from the moment you walk through our doors, you can expect a calm, welcoming environment where your concerns are heard and your goals are prioritized. A space where medical expertise meets elevated care - where every detail is intentional, and every treatment is delivered with precision and purpose.\n\nA proud veteran, devoted wife, and mother of five, Evelia is guided by her faith-centered values, which shape her commitment to compassionate, elevated, and deeply personalized care - rooted in integrity and a genuine desire to serve.`,
    },
    {
      id: 'sarah',
      name: 'Sarah Malone, MSN, WHNP',
      role: 'Nurse Injector',
      highlight: '',
      image: '/images/team-12-img.png',
      imageAlt: 'Sarah Malone, MSN, WHNP',
      sortOrder: 4,
      isActive: true,
      bio: `“Why live to 90 if you're going to feel 90?”\n\nThat belief drives everything Sarah Malone, MSN, WHNP-BC, does as a women's health nurse practitioner, Army Nurse Corps veteran, and hormone specialist.\n\nSarah Malone has over a decade of nursing experience and several years specializing in hormone optimization and women's health. A graduate of Duke University's Women's Health Nurse Practitioner program, Sarah has completed advanced training through WorldLink Medical, a society dedicated to advancing hormone-based care, and continues to pursue ongoing education through their programs. Her clinical focus includes PCOS, sexual wellness, and the care of perimenopausal and menopausal women. She is especially dedicated to helping patients understand the profound impact hormones have on quality of life, energy, mood, metabolism, and long-term health and longevity. Sarah believes that when hormones are optimized, women don't just feel “normal”—they thrive.\n\nShe is committed to providing nonjudgmental, sex-positive care, creating a safe and empowering space where women feel comfortable discussing their concerns and taking ownership of their health. In addition to bioidentical hormone replacement therapy (BHRT), Sarah has a strong interest in integrating regenerative and aesthetic medicine into her practice. She combines hormone optimization with treatments such as PRP and medical aesthetics to support whole-body wellness, confidence, and vitality from the inside out.\n\nSarah is also a clinical educator and has spent over seven years teaching undergraduate nursing students, reflecting her deep commitment to education, empowerment, and advancing the field of women's health.`,
    },
  ];
}

