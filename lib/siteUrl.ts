import { headers } from 'next/headers';

export const SITE_URL = 'https://www.savannahskinmed.com';

/** Resolves a site-local asset path (e.g. `/social-preview.jpg`) to an
 * absolute URL for OG/Twitter meta tags.
 *
 * In development the page is served from localhost, where the production
 * origin can't reach the file yet — so point crawlers/OG checkers at the
 * origin that actually served the request (works with tunnels too).
 * Production builds take the canonical site URL, so social shares always
 * reference www.savannahskinmed.com. */
export async function resolveSiteAssetUrl(path: string): Promise<string> {
  if (process.env.NODE_ENV === 'development') {
    const h = await headers();
    const host = h.get('x-forwarded-host') || h.get('host');
    const proto = h.get('x-forwarded-proto') || 'http';
    if (host) {
      return `${proto}://${host}${path.startsWith('/') ? path : `/${path}`}`;
    }
  }
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
