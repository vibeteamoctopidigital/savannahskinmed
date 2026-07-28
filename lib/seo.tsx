import type { Metadata } from 'next';
import { cache } from 'react';

import { getResolvedPageSeo, type ResolvedPageSeo } from '@/lib/data/pageSeo';
import { SITE_URL } from '@/lib/siteUrl';

/** Deduped per-request: `generateMetadata` and the page body both resolve
 * the same route's SEO row without hitting the database twice. */
export const resolvePageSeo = cache(getResolvedPageSeo);

function robotsFor(directive: ResolvedPageSeo['robots']): Metadata['robots'] {
  switch (directive) {
    case 'INDEX_FOLLOW':
      return { index: true, follow: true };
    case 'NOINDEX_FOLLOW':
      return { index: false, follow: true };
    case 'NOINDEX_NOFOLLOW':
      return { index: false, follow: false };
    case 'INHERIT':
    default:
      // Omit entirely — the root layout's site-wide default (index, follow) applies.
      return undefined;
  }
}

/** Default social-preview image — an existing site photo, not new content. */
const DEFAULT_OG_IMAGE = '/images/banner-bg.jpg';

/** Builds a page's `generateMetadata()` return value from its DB override
 * (falling back to the route's hardcoded default title/description when a
 * field is blank or the database is unreachable). */
export async function buildPageMetadata(route: string): Promise<Metadata> {
  const seo = await resolvePageSeo(route);

  const canonical = seo.canonicalUrl || `${SITE_URL}${route === '/' ? '' : route}`;
  const ogImage = { url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: seo.title };

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical },
    robots: robotsFor(seo.robots),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Admin-authored content only (never public user input) — the same
      // trust boundary as the tracking-code injection in the root layout.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildBreadcrumbSchema(route: string, title: string) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }];
  if (route !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: `${SITE_URL}${route}`,
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

function buildServiceSchema(route: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${SITE_URL}${route}`,
    provider: { '@type': 'MedicalBusiness', name: 'Savannah Age Management Medicine' },
  };
}

/** Renders the per-route JSON-LD: the admin's custom schema when configured,
 * otherwise an auto-generated BreadcrumbList (plus a Service block for
 * treatment pages, built from the exact same title/description already
 * resolved for the page's meta tags) — or nothing if disabled. */
export async function PageJsonLd({ route, isService = false }: { route: string; isService?: boolean }) {
  const seo = await resolvePageSeo(route);
  if (!seo.schemaEnabled) return null;

  if (seo.schemaSource === 'CUSTOM' && seo.customSchema.trim()) {
    try {
      const parsed = JSON.parse(seo.customSchema);
      return <JsonLdScript data={parsed} />;
    } catch {
      return null;
    }
  }

  if (route === '/') return null;
  return (
    <>
      <JsonLdScript data={buildBreadcrumbSchema(route, seo.title)} />
      {isService && <JsonLdScript data={buildServiceSchema(route, seo.title, seo.description)} />}
    </>
  );
}

/** "123 Main St, Suite 4" + "Pooler, GA 31322" -> a proper PostalAddress.
 * Falls back to a plain streetAddress if the second line doesn't match the
 * expected "City, ST ZIP" shape, since we'd rather under-structure real data
 * than guess wrong. */
function parseAddress(addressLines: string[]) {
  const [street, cityStateZip] = addressLines;
  const match = cityStateZip?.match(/^(.+?),\s*([A-Z]{2})\s*(\d{5}(?:-\d{4})?)?$/);

  if (!street || !match) {
    return { '@type': 'PostalAddress', streetAddress: addressLines.join(', ') };
  }

  const [, city, state, zip] = match;
  return {
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: city,
    addressRegion: state,
    ...(zip ? { postalCode: zip } : {}),
    addressCountry: 'US',
  };
}

type OrgLocation = { city: string; addressLines: string[] };
type OrgSocial = { href: string };

/** Site-wide Organization/MedicalBusiness schema — rendered once in the
 * root layout, present on every page regardless of per-route settings.
 * Locations and social links are the same real, already-published records
 * shown in the footer — nothing here is new or invented content. */
export function OrganizationJsonLd({
  name,
  description,
  phone,
  email,
  address,
  locations = [],
  socials = [],
}: {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  locations?: OrgLocation[];
  socials?: OrgSocial[];
}) {
  const primaryAddress = locations[0]
    ? parseAddress(locations[0].addressLines)
    : { '@type': 'PostalAddress', streetAddress: address };

  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name,
    description,
    url: SITE_URL,
    telephone: phone,
    email,
    address: primaryAddress,
    ...(locations.length > 0 ? { areaServed: locations.map((l) => l.city) } : {}),
    ...(socials.length > 0 ? { sameAs: socials.map((s) => s.href) } : {}),
  };
  return <JsonLdScript data={data} />;
}

// ---------------------------------------------------------------------------
// FAQ schema — wraps FAQ content that's already live on the page (the same
// question/answer pairs rendered by FaqAccordion). No new copy is added;
// this only makes the existing text machine-readable for AEO.
// ---------------------------------------------------------------------------

export type FaqSchemaItem = { question: string; answer: React.ReactNode };

/** Renders a FAQPage JSON-LD block for a page's existing FAQ content — pass
 * the exact same `faqs` array already rendered by FaqAccordion, no rewriting.
 * schema.org needs plain text, so entries whose answer isn't already a
 * plain string (e.g. one built from JSX) are skipped rather than guessed at. */
export function FaqJsonLd({ faqs }: { faqs: FaqSchemaItem[] }) {
  const plainTextFaqs = faqs.filter(
    (faq): faq is { question: string; answer: string } => typeof faq.answer === 'string',
  );
  if (plainTextFaqs.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: plainTextFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <JsonLdScript data={data} />;
}
