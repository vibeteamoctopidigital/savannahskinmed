import { headers } from 'next/headers';

export const SITE_URL = 'https://www.savannahskinmed.com';

/** Normalizes a canonical/OG URL to the exact form the page is served at:
 * no trailing slash on any path (Next 308-redirects `/foo/` -> `/foo`),
 * except the bare root, which is always `https://host/`. Accepts absolute
 * URLs or site-relative paths (e.g. an admin-entered override), and falls
 * back to `fallback` if the value can't be parsed. */
export function normalizeCanonicalUrl(url: string, fallback: string = SITE_URL): string {
  let parsed: URL;
  try {
    parsed = new URL(url, SITE_URL);
  } catch {
    parsed = new URL(fallback, SITE_URL);
  }
  if (parsed.pathname !== '/') {
    parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  }
  return parsed.href;
}

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
