/**
 * Registry of every real, indexable route on the site, with the title/
 * description that page already ships with today. This is the "hardcoded
 * default" the SEO admin's per-route override falls back to when a field is
 * left blank, and it's also what powers the SEO Meta admin list's "Sync
 * routes" button (ensuring every route here has a PageSeo row to edit).
 */
export type SeoRouteDefault = {
  route: string;
  title: string;
  description: string;
};

export const seoRoutes: SeoRouteDefault[] = [
  {
    route: '/',
    title: 'Savannah Age Management Medicine | Medical Aesthetics in Pooler, GA',
    description:
      'Customized medical aesthetic solutions to enhance your glow and restore youthful skin. Medical-grade facials, laser treatments, injectables and IV therapy in Pooler and Statesboro, GA.',
  },
  {
    route: '/medical-grade-facials',
    title: 'Medical Grade Facials',
    description:
      'Clinical facials built around your skin type, tone and goals — from deep cleansing to dermaplaning and resurfacing.',
  },
  {
    route: '/laser-hair-removal',
    title: 'Laser Hair Removal',
    description:
      'Comfortable, effective laser hair reduction delivered by providers with decades of combined laser experience.',
  },
  {
    route: '/injectables-wrinkle-prevention',
    title: 'Injectables & Wrinkle Prevention',
    description:
      'Neuromodulators and dermal fillers used with a light touch, to soften lines while keeping your expressions your own.',
  },
  {
    route: '/laser-skin-rejuvenation',
    title: 'Laser Skin Rejuvenation',
    description:
      'Restore your confidence and glow. Laser treatments to smooth, clear, and revitalize your skin.',
  },
  {
    route: '/iv-infusion-therapy-vitamin-injections',
    title: 'IV Infusion Therapy & Vitamin Injections',
    description:
      'Hydration, vitamins and antioxidants delivered directly into the bloodstream for fast, efficient absorption.',
  },
  {
    route: '/vaginal-rejuvenation',
    title: 'Vaginal Rejuvenation',
    description: 'A discreet and effective solution to restore comfort, confidence, and intimacy.',
  },
  {
    route: '/aesthetic-membership-program',
    title: 'Aesthetic Membership Program',
    description:
      'Maintain your aesthetic results with exclusive member pricing, flexible monthly credits, and a personalized care plan.',
  },
  {
    route: '/specials',
    title: 'Aesthetic Specials',
    description:
      'Current promotions and seasonal offers on aesthetic treatments at Savannah Age Management Medicine.',
  },
  {
    route: '/our-clinic',
    title: 'Our Clinic',
    description:
      'Our clinic is your destination for advanced, personalized aesthetic treatments that promote healthy, radiant skin and a more confident you.',
  },
  {
    route: '/services',
    title: 'Our Services',
    description:
      'Medical-grade facials, laser treatments, injectables, IV therapy and age management care in Pooler and Statesboro, GA.',
  },
  {
    route: '/contact-us',
    title: 'Contact Us',
    description:
      'Reach out to Savannah Age Management Medicine in Pooler and Statesboro, GA to book your medical-grade facial or ask any questions.',
  },
  {
    route: '/financing-options',
    title: 'Financing Options',
    description:
      'Flexible payment and financing options for aesthetic treatments at Savannah Age Management Medicine, powered by Cherry.',
  },
  {
    route: '/office-policies',
    title: 'Office Policies',
    description: 'Appointment, cancellation and payment policies for Savannah Age Management Medicine.',
  },
  {
    route: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'How Savannah Age Management Medicine collects, uses and protects your information.',
  },
];

export const getSeoRouteDefault = (route: string) =>
  seoRoutes.find((r) => r.route === route) ?? { route, title: '', description: '' };

/** `/` -> "home", `/contact-us` -> "contact-us" — used for the admin edit URL. */
export const routeToSlug = (route: string) => (route === '/' ? 'home' : route.replace(/^\//, ''));

/** Inverse of `routeToSlug`. */
export const slugToRoute = (slug: string) => (slug === 'home' ? '/' : `/${slug}`);
