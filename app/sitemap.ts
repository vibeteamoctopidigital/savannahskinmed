import type { MetadataRoute } from 'next';

import { seoRoutes } from '@/lib/seoRoutes';
import { SITE_URL } from '@/lib/siteUrl';

const highPriorityRoutes = new Set([
  '/medical-grade-facials',
  '/laser-hair-removal',
  '/injectables-wrinkle-prevention',
  '/laser-skin-rejuvenation',
  '/iv-infusion-therapy-vitamin-injections',
  '/vaginal-rejuvenation',
  '/aesthetic-membership-program',
  '/specials',
]);

const mediumPriorityRoutes = new Set(['/our-clinic', '/services', '/contact-us']);

function priorityFor(route: string) {
  if (route === '/') return 1;
  if (highPriorityRoutes.has(route)) return 0.8;
  if (mediumPriorityRoutes.has(route)) return 0.7;
  return 0.5;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return seoRoutes.map(({ route }) => ({
    url: `${SITE_URL}${route === '/' ? '/' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'daily' : 'monthly',
    priority: priorityFor(route),
  }));
}
