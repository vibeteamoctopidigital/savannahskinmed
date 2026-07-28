import { prisma } from '@/lib/prisma';
import { getSeoRouteDefault, seoRoutes } from '@/lib/seoRoutes';
import type { PageSeo } from '@/lib/generated/prisma/client';

export type ResolvedPageSeo = {
  route: string;
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  robots: 'INHERIT' | 'INDEX_FOLLOW' | 'NOINDEX_FOLLOW' | 'NOINDEX_NOFOLLOW';
  schemaEnabled: boolean;
  schemaSource: 'AUTO' | 'CUSTOM';
  customSchema: string;
};

/** DB override merged with the page's own hardcoded default — blank DB
 * fields fall back to the default, and a fully-unreachable DB falls back
 * to the default entirely. */
export async function getResolvedPageSeo(route: string): Promise<ResolvedPageSeo> {
  const fallback = getSeoRouteDefault(route);
  const base: ResolvedPageSeo = {
    route,
    title: fallback.title,
    description: fallback.description,
    keywords: '',
    canonicalUrl: '',
    robots: 'INHERIT',
    schemaEnabled: true,
    schemaSource: 'AUTO',
    customSchema: '',
  };

  try {
    const row = await prisma.pageSeo.findUnique({ where: { route } });
    if (!row) return base;

    return {
      route,
      title: row.title || base.title,
      description: row.description || base.description,
      keywords: row.keywords,
      canonicalUrl: row.canonicalUrl,
      robots: row.robots,
      schemaEnabled: row.schemaEnabled,
      schemaSource: row.schemaSource,
      customSchema: row.customSchema,
    };
  } catch {
    return base;
  }
}

export type DbResult<T> = { ok: true; data: T } | { ok: false; error: string };

export async function listPageSeo(): Promise<DbResult<PageSeo[]>> {
  try {
    const rows = await prisma.pageSeo.findMany({ orderBy: { route: 'asc' } });
    return { ok: true, data: rows };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getPageSeoByRoute(route: string): Promise<PageSeo | null> {
  try {
    return await prisma.pageSeo.findUnique({ where: { route } });
  } catch {
    return null;
  }
}

/** Ensures every route in the registry has a PageSeo row (creates missing
 * ones with all-blank overrides), without touching rows that already exist. */
export async function syncPageSeoRoutes(): Promise<DbResult<{ created: number }>> {
  try {
    let created = 0;
    for (const { route } of seoRoutes) {
      const existing = await prisma.pageSeo.findUnique({ where: { route } });
      if (!existing) {
        await prisma.pageSeo.create({ data: { route } });
        created += 1;
      }
    }
    return { ok: true, data: { created } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
