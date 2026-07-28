import Link from 'next/link';

import { getSubmissionCounts, listSubmissions } from '@/lib/data/submissions';
import { badgeClass, cardClass } from '@/lib/adminUi';

export const dynamic = 'force-dynamic';

const typeLabels: Record<string, string> = {
  BOOKING: 'Booking',
  CLAIM: 'Claim',
  MEMBERSHIP_REQUEST: 'Membership Request',
  CONTACT: 'Contact',
};

const statCards = [
  { key: 'total', label: 'Total Submissions', icon: '📊' },
  { key: 'new', label: 'New', icon: '✦', highlight: true },
  { key: 'BOOKING', label: 'Bookings', icon: '📅' },
  { key: 'CLAIM', label: 'Claims', icon: '🎁' },
  { key: 'MEMBERSHIP_REQUEST', label: 'Membership Requests', icon: '💎' },
] as const;

export default async function AdminDashboardHome() {
  const [countsResult, recentResult] = await Promise.all([
    getSubmissionCounts(),
    listSubmissions(),
  ]);

  if (!countsResult.ok || !recentResult.ok) {
    return (
      <div className={cardClass}>
        <h1 className="mb-2 font-serif text-[24px] text-navy">Overview</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          start collecting submissions.
        </p>
      </div>
    );
  }

  const { total, byType, newCount } = countsResult.data;
  const recent = recentResult.data.slice(0, 8);
  const values: Record<string, number> = { total, new: newCount, ...byType };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Overview</h1>
        <p className="text-[13px] text-muted">A snapshot of activity across the site</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((card) => (
          <StatCard key={card.key} label={card.label} icon={card.icon} value={values[card.key] ?? 0} highlight={'highlight' in card && card.highlight} />
        ))}
      </div>

      <div className={cardClass}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-navy">Recent Submissions</h2>
          <Link
            href="/admin/dashboard/submissions"
            className="text-[13px] font-medium text-rose-deep transition-colors hover:text-rose-light"
          >
            View all &rarr;
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="text-[14px] text-muted">No submissions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-navy/10 text-[11px] uppercase tracking-wide text-muted">
                  <th className="pb-3 pr-4 font-semibold">Type</th>
                  <th className="pb-3 pr-4 font-semibold">Name</th>
                  <th className="pb-3 pr-4 font-semibold">Contact</th>
                  <th className="pb-3 pr-4 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id} className="border-b border-navy/5 transition-colors hover:bg-navy/[0.02]">
                    <td className="py-3.5 pr-4">
                      <span className={badgeClass(s.type)}>{typeLabels[s.type] ?? s.type}</span>
                    </td>
                    <td className="py-3.5 pr-4 font-medium text-navy">
                      {s.name ?? ([s.firstName, s.lastName].filter(Boolean).join(' ') || '—')}
                    </td>
                    <td className="py-3.5 pr-4 text-muted">{s.email ?? s.phone ?? '—'}</td>
                    <td className="py-3.5 pr-4">
                      <span className={badgeClass(s.status)}>{s.status}</span>
                    </td>
                    <td className="py-3.5 text-muted">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-card transition-transform duration-200 hover:-translate-y-0.5 ${
        highlight ? 'bg-navy text-white' : 'border border-navy/[0.06] bg-white text-navy'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-[28px] font-serif font-semibold ${highlight ? 'text-white' : 'text-navy'}`}>
          {value}
        </p>
        <span
          aria-hidden="true"
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[15px] ${
            highlight ? 'bg-white/15' : 'bg-navy/5'
          }`}
        >
          {icon}
        </span>
      </div>
      <p className={`mt-1 text-[13px] ${highlight ? 'text-white/80' : 'text-muted'}`}>{label}</p>
    </div>
  );
}
