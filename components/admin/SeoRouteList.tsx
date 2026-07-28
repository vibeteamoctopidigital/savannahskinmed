'use client';

import Link from 'next/link';
import { useState } from 'react';

import { routeToSlug } from '@/lib/seoRoutes';

export type SeoRouteRow = {
  route: string;
  title: string;
  schemaEnabled: boolean;
  schemaSource: 'AUTO' | 'CUSTOM';
};

export default function SeoRouteList({ rows }: { rows: SeoRouteRow[] }) {
  const [query, setQuery] = useState('');

  const filtered = rows.filter((row) => {
    const q = query.toLowerCase();
    return row.route.toLowerCase().includes(q) || row.title.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 rounded-xl border border-navy/10 bg-white px-4 py-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by route or title…"
          className="w-full bg-transparent text-[14px] text-navy outline-none placeholder:text-muted"
        />
        <span className="shrink-0 text-[12px] text-muted">{filtered.length} matches</span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-navy/10 text-[11px] uppercase tracking-wide text-muted">
              <th className="px-5 py-3">Route</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Schema</th>
              <th className="px-5 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.route} className="border-b border-navy/5 last:border-0">
                <td className="px-5 py-3 font-mono text-[13px] text-navy">{row.route}</td>
                <td className="px-5 py-3 text-navy">{row.title}</td>
                <td className="px-5 py-3">
                  {row.schemaEnabled ? (
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        row.schemaSource === 'CUSTOM'
                          ? 'bg-rose-pale text-rose-deep'
                          : 'bg-mint text-sage'
                      }`}
                    >
                      {row.schemaSource === 'CUSTOM' ? 'Custom' : 'Auto'}
                    </span>
                  ) : (
                    <span className="rounded-full bg-navy/5 px-2.5 py-1 text-[11px] font-medium text-muted">
                      Off
                    </span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/dashboard/seo/${routeToSlug(row.route)}`}
                    className="text-rose-deep hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-6 text-center text-muted">
                  No routes match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
