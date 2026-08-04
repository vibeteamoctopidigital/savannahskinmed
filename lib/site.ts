export const site = {
  name: 'Savannah Age Management Medicine',
  phone: '(912) 925-6911',
  phoneHref: 'tel:+19129256911',
  email: 'info@agemanagementmed.com',
  emailHref: 'mailto:info@agemanagementmed.com',
  bookingUrl: '/contact-us',
} as const;

export type ServiceLink = {
  label: string;
  href: string;
};

/** Order matches the "Services" dropdown in the main navigation. */
export const services: ServiceLink[] = [
  { label: 'Medical Grade Facials', href: '/medical-grade-facials' },
  { label: 'Laser Hair Removal', href: '/laser-hair-removal' },
  { label: 'Injectables & Wrinkle Prevention', href: '/injectables-wrinkle-prevention' },
  { label: 'Laser Skin Rejuvenation', href: '/laser-skin-rejuvenation' },
  { label: 'IV Infusion Therapy & Vitamin Injections', href: '/iv-infusion-therapy-vitamin-injections' },
  { label: 'Vaginal Rejuvenation', href: '/vaginal-rejuvenation' },
  { label: 'Aesthetic Membership Program', href: '/aesthetic-membership-program' },
  { label: 'Aesthetic Specials', href: '/specials' },
  { label: 'Health & Wellness Services', href: '/services/health-wellness-services' },
];

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Our Clinic', href: '/our-clinic' },
  { label: 'Services', href: '/services', children: services },
  { label: 'Contact', href: '/contact-us' },
] as const;

export const quickLinks: ServiceLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Our Clinic', href: '/our-clinic' },
  { label: 'Our Experts', href: '/our-experts' },
  { label: 'Financing Options', href: '/financing-options' },
  { label: 'Office Policies', href: '/office-policies' },
  { label: 'Aesthetic Specials', href: '/specials' },
  { label: 'Contact', href: '/contact-us' },
];

/** Footer "Services" column — uses the site's hyphenated naming. */
export const footerServices: ServiceLink[] = [
  { label: 'Medical-Grade Facials', href: '/medical-grade-facials' },
  { label: 'Laser Hair Removal', href: '/laser-hair-removal' },
  { label: 'Injectables & Wrinkle Prevention', href: '/injectables-wrinkle-prevention' },
  { label: 'Laser Skin Rejuvenation', href: '/laser-skin-rejuvenation' },
  { label: 'IV Infusion Therapy & Vitamin Injections', href: '/iv-infusion-therapy-vitamin-injections' },
  { label: 'Vaginal Rejuvenation', href: '/vaginal-rejuvenation' },
  { label: 'Aesthetic Membership Program', href: '/aesthetic-membership-program' },
  { label: 'Health & Wellness Services', href: '/services/health-wellness-services' },
];

export type Location = {
  city: string;
  address: string[];
  badge?: string;
  hours: { days: string; time: string }[];
  /** Condensed single-line hours used in the footer. */
  hoursShort: { days: string; time: string }[];
};

export const locations: Location[] = [
  {
    city: 'Savannah',
    address: ['200 Blue Moon Xing, Suite 102', 'Pooler, GA 31322'],
    hours: [
      { days: 'Mon to Thu:', time: '9:00 AM - 5:00 PM' },
      { days: 'Friday:', time: '9:00 AM - 3:00 PM' },
      { days: 'Sat to Sun:', time: 'Closed' },
    ],
    hoursShort: [
      { days: 'Mon-Thu:', time: '9AM - 5PM' },
      { days: 'Fri:', time: '9AM - 3PM' },
    ],
  },
  {
    city: 'Statesboro',
    badge: 'Contact The Office For Appointment Availability',
    address: ['5 Oak Street', 'Statesboro, GA 30458'],
    hours: [
      { days: 'Mon to Thu:', time: '8:00 AM - 4:00 PM' },
      { days: 'Friday:', time: '8:00 AM - 2:00 PM' },
    ],
    hoursShort: [
      { days: 'Mon-Thu:', time: '8AM - 4PM' },
      { days: 'Fri:', time: '8AM - 2PM' },
    ],
  },
];

/**
 * Clinic slugs used to tag which offers run at which office. Kept separate from
 * `locations` above because that list is keyed on `city` ("Savannah") while
 * offers and the booking form both refer to the office as "Pooler".
 */
export type SpecialLocation = { slug: string; label: string };

export const specialLocations: SpecialLocation[] = [
  { slug: 'statesboro', label: 'Statesboro' },
  { slug: 'pooler', label: 'Pooler' },
];

/**
 * Normalizes the free-form `SpecialCard.locations` JSON column into known
 * slugs. An empty result means "runs at every location", which is what every
 * pre-existing row (locations = null) should keep doing.
 */
export function normalizeSpecialLocations(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const valid = new Set(specialLocations.map((l) => l.slug));
  const slugs = value
    .filter((entry): entry is string => typeof entry === 'string')
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => valid.has(entry));

  return [...new Set(slugs)];
}

export const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/SavannahAgeManagementMedicine', icon: 'facebook' as const },
  { label: 'Instagram', href: 'https://www.instagram.com/savannah_age_management', icon: 'instagram' as const },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/savannah-age-management-medicine/', icon: 'linkedin' as const },
];
