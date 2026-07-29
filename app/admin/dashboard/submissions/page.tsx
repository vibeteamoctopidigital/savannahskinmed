import Link from 'next/link';

import DeleteButton from '@/components/admin/DeleteButton';
import SubmissionDetailsModal from '@/components/admin/SubmissionDetailsModal';
import SubmissionStatusSelect from '@/components/admin/SubmissionStatusSelect';
import { listSubmissions } from '@/lib/data/submissions';
import { SubmissionType } from '@/lib/generated/prisma/client';
import { badgeClass, cardClass, dangerBtn } from '@/lib/adminUi';
import { deleteSubmissionAction } from './actions';

export const dynamic = 'force-dynamic';

const typeLabels: Record<SubmissionType, string> = {
  BOOKING: 'Booking',
  CLAIM: 'Claim',
  MEMBERSHIP_REQUEST: 'Membership Request',
  CONTACT: 'Contact',
};

const filters: { label: string; value?: SubmissionType }[] = [
  { label: 'All' },
  { label: 'Bookings', value: SubmissionType.BOOKING },
  { label: 'Claims', value: SubmissionType.CLAIM },
  { label: 'Membership Requests', value: SubmissionType.MEMBERSHIP_REQUEST },
  { label: 'Contact', value: SubmissionType.CONTACT },
];

export default async function SubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = type && type in SubmissionType ? (type as SubmissionType) : undefined;

  const result = await listSubmissions(activeType ? { type: activeType } : undefined);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-[26px] text-navy">Submissions</h1>
          <p className="text-[13px] text-muted">
            All leads, booking requests, offer claims, and membership inquiries.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => {
            const isActive = activeType === f.value;
            const href = f.value
              ? `/admin/dashboard/submissions?type=${f.value}`
              : '/admin/dashboard/submissions';

            return (
              <Link
                key={f.label}
                href={href}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'border-navy bg-navy text-white shadow-xs'
                    : 'border-navy/20 bg-white text-navy hover:border-navy'
                }`}
              >
                {f.label}
              </Link>
            );
          })}
        </div>
      </div>

      {!result.ok ? (
        <div className={cardClass}>
          <p className="text-[14px] text-muted">
            Database not connected yet. Set <code>DATABASE_URL</code> and run migrations to see
            submissions here.
          </p>
        </div>
      ) : result.data.length === 0 ? (
        <div className={cardClass}>
          <p className="text-[14px] text-muted">No submissions match this filter yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-navy/10 bg-white shadow-card">
          <table className="w-full min-w-[880px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-navy/10 bg-cream/70 font-serif text-[12px] font-bold uppercase tracking-wider text-navy">
                <th className="p-4">Type / Offer</th>
                <th className="p-4">Name</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Details</th>
                <th className="p-4">Message</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {result.data.map((s) => {
                const name =
                  s.name ?? ([s.firstName, s.lastName].filter(Boolean).join(' ') || '—');
                const hasAnyDetails =
                  Boolean(s.location) ||
                  Boolean(s.service) ||
                  Boolean(s.preferredDate) ||
                  Boolean(s.preferredTime) ||
                  Boolean(s.message) ||
                  Boolean(s.notes);

                const createdAtFormatted = `${new Date(s.createdAt).toLocaleDateString()} at ${new Date(s.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

                return (
                  <tr key={s.id} className="transition-colors hover:bg-mist/40">
                    <td className="p-4 align-middle">
                      <span className={badgeClass(s.type)}>{typeLabels[s.type]}</span>
                      {s.offerLabel && (
                        <p className="mt-1 text-[12px] font-medium text-rose-deep">
                          {s.offerLabel}
                        </p>
                      )}
                    </td>
                    <td className="p-4 align-middle font-serif text-[15px] font-medium text-navy">
                      {name}
                    </td>
                    <td className="p-4 align-middle text-[13px] text-muted">
                      {s.email && (
                        <p className="font-medium text-navy truncate max-w-[200px]">
                          <a href={`mailto:${s.email}`} className="hover:text-rose-deep">
                            {s.email}
                          </a>
                        </p>
                      )}
                      {s.phone && (
                        <p className="text-[12px] mt-0.5">
                          <a href={`tel:${s.phone}`} className="hover:text-rose-deep">
                            {s.phone}
                          </a>
                        </p>
                      )}
                      {!s.email && !s.phone && '—'}
                    </td>
                    <td className="p-4 align-middle">
                      {hasAnyDetails ? (
                        <SubmissionDetailsModal
                          submission={{
                            id: s.id,
                            type: s.type,
                            offerLabel: s.offerLabel,
                            name,
                            email: s.email,
                            phone: s.phone,
                            location: s.location,
                            service: s.service,
                            preferredDate: [s.preferredDate, s.preferredTime]
                              .filter(Boolean)
                              .join(' '),
                            message: s.notes || s.message,
                            createdAtFormatted,
                            status: s.status,
                          }}
                          badgeClassName={badgeClass(s.type)}
                          typeLabel={typeLabels[s.type]}
                        />
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="max-w-[180px] p-4 align-middle text-[13px] leading-snug text-navy">
                      {s.notes || s.message ? (
                        <p className="truncate" title={s.notes || s.message || ''}>
                          &ldquo;{s.notes || s.message}&rdquo;
                        </p>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap p-4 align-middle text-[12.5px] text-muted">
                      <p className="font-medium text-navy">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-[11px] text-muted">
                        {new Date(s.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </td>
                    <td className="p-4 align-middle">
                      <SubmissionStatusSelect id={s.id} currentStatus={s.status} />
                    </td>
                    <td className="p-4 align-middle text-right">
                      <DeleteButton
                        action={deleteSubmissionAction}
                        id={s.id}
                        itemLabel={`submission from ${name}`}
                        className={dangerBtn}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
