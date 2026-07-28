import Link from 'next/link';

import { prisma } from '@/lib/prisma';
import SeoEditForm from '@/components/admin/SeoEditForm';
import { getSeoRouteDefault, slugToRoute } from '@/lib/seoRoutes';
import { updatePageSeoAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function SeoRouteEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const route = slugToRoute(slug);
  const fallback = getSeoRouteDefault(route);

  let row;
  try {
    row = await prisma.pageSeo.findUnique({ where: { route } });
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">SEO Meta</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed.
        </p>
      </div>
    );
  }

  if (!row) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Route not found</h1>
        <p className="mb-4 text-[14px] text-muted">
          No SEO row exists yet for <code>{route}</code>. Sync routes first.
        </p>
        <Link href="/admin/dashboard/seo" className="text-rose-deep hover:underline">
          &larr; Back to SEO Meta
        </Link>
      </div>
    );
  }

  return (
    <SeoEditForm
      id={row.id}
      slug={slug}
      route={route}
      fallbackTitle={fallback.title}
      fallbackDescription={fallback.description}
      title={row.title}
      description={row.description}
      keywords={row.keywords}
      canonicalUrl={row.canonicalUrl}
      robots={row.robots}
      schemaEnabled={row.schemaEnabled}
      schemaSource={row.schemaSource}
      customSchema={row.customSchema}
      action={updatePageSeoAction}
    />
  );
}
