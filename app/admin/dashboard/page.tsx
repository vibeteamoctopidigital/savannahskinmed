import Link from 'next/link';

import { getSubmissionCounts, listSubmissions } from '@/lib/data/submissions';

export const dynamic = 'force-dynamic';

const typeLabels: Record<string, string> = {
  BOOKING: 'Booking',
  CLAIM: 'Claim',
  MEMBERSHIP_REQUEST: 'Membership Request',
  CONTACT: 'Contact',
};

export default async function AdminDashboardHome() {
  const [countsResult, recentResult] = await Promise.all([
    getSubmissionCounts(),
    listSubmissions(),
  ]);

  if (!countsResult.ok || !recentResult.ok) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
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

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-[26px] text-navy">Overview</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Submissions" value={total} />
        <StatCard label="New" value={newCount} highlight />
        <StatCard label="Bookings" value={byType.BOOKING} />
        <StatCard label="Claims" value={byType.CLAIM} />
        <StatCard label="Membership Requests" value={byType.MEMBERSHIP_REQUEST} />
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-navy">Recent Submissions</h2>
          <Link
            href="/admin/dashboard/submissions"
            className="text-[13px] font-medium text-rose-deep hover:underline"
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
                <tr className="border-b border-navy/10 text-[12px] uppercase tracking-wide text-muted">
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Contact</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((s) => (
                  <tr key={s.id} className="border-b border-navy/5">
                    <td className="py-3 pr-4 text-navy">{typeLabels[s.type] ?? s.type}</td>
                    <td className="py-3 pr-4 text-navy">
                      {s.name ?? ([s.firstName, s.lastName].filter(Boolean).join(' ') || '—')}
                    </td>
                    <td className="py-3 pr-4 text-muted">{s.email ?? s.phone ?? '—'}</td>
                    <td className="py-3 pr-4 text-muted">{s.status}</td>
                    <td className="py-3 text-muted">
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
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 shadow-card ${highlight ? 'bg-navy text-white' : 'bg-white text-navy'}`}
    >
      <p className={`text-[28px] font-serif ${highlight ? 'text-white' : 'text-navy'}`}>{value}</p>
      <p className={`mt-1 text-[13px] ${highlight ? 'text-white/80' : 'text-muted'}`}>{label}</p>
    </div>
  );
}
