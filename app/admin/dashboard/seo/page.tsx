import { prisma } from '@/lib/prisma';
import SeoRouteList from '@/components/admin/SeoRouteList';
import { getSeoRouteDefault } from '@/lib/seoRoutes';
import { cardClass, primaryBtn } from '@/lib/adminUi';
import { syncRoutesAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function SeoMetaListPage() {
  let rows;
  try {
    rows = await prisma.pageSeo.findMany({ orderBy: { route: 'asc' } });
  } catch {
    return (
      <div className={cardClass}>
        <h1 className="mb-2 font-serif text-[24px] text-navy">SEO Meta</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage per-route SEO.
        </p>
      </div>
    );
  }

  const displayRows = rows.map((row) => ({
    route: row.route,
    title: row.title || getSeoRouteDefault(row.route).title,
    schemaEnabled: row.schemaEnabled,
    schemaSource: row.schemaSource,
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[26px] text-navy">SEO Meta</h1>
          <p className="text-[13px] text-muted">
            {rows.length} routes · per-page title, description, keywords &amp; schema
          </p>
        </div>
        <form action={syncRoutesAction}>
          <button type="submit" className={primaryBtn}>
            Sync routes
          </button>
        </form>
      </div>

      <SeoRouteList rows={displayRows} />
    </div>
  );
}
