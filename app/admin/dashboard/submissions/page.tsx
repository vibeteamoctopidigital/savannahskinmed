import Link from 'next/link';

import AddInlineForm from '@/components/admin/AddInlineForm';
import DeleteButton from '@/components/admin/DeleteButton';
import PendingSubmitButton from '@/components/admin/PendingSubmitButton';
import { listSubmissions } from '@/lib/data/submissions';
import { SubmissionStatus, SubmissionType } from '@/lib/generated/prisma/client';
import { badgeClass, cardClass, dangerBtn, smallBtn } from '@/lib/adminUi';
import { deleteSubmissionAction, updateStatusAction } from './actions';

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-[26px] text-navy">Submissions</h1>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f.value === activeType;
            const href = f.value
              ? `/admin/dashboard/submissions?type=${f.value}`
              : '/admin/dashboard/submissions';
            return (
              <Link
                key={f.label}
                href={href}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'border-navy bg-navy text-white'
                    : 'border-navy/20 text-navy hover:border-navy'
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
          <table className="w-full min-w-[860px] border-collapse text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-navy/10 bg-cream/60 font-serif text-[13px] font-semibold uppercase tracking-wider text-navy">
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
                return (
                  <tr key={s.id} className="transition-colors hover:bg-mist/30">
                    <td className="p-4 align-top">
                      <span className={badgeClass(s.type)}>{typeLabels[s.type]}</span>
                      {s.offerLabel && (
                        <p className="mt-1 text-[12px] font-medium text-muted">
                          {s.offerLabel}
                        </p>
                      )}
                    </td>
                    <td className="p-4 align-top font-serif text-[15px] font-medium text-navy">
                      {name}
                    </td>
                    <td className="p-4 align-top text-muted">
                      {s.email && <p className="text-navy">{s.email}</p>}
                      {s.phone && <p>{s.phone}</p>}
                      {!s.email && !s.phone && '—'}
                    </td>
                    <td className="p-4 align-top text-[12.5px] text-muted">
                      {s.location && <p>Loc: {s.location}</p>}
                      {s.service && <p>Svc: {s.service}</p>}
                      {(s.preferredDate || s.preferredTime) && (
                        <p>
                          Pref: {s.preferredDate} {s.preferredTime}
                        </p>
                      )}
                      {!s.location && !s.service && !s.preferredDate && !s.preferredTime && '—'}
                    </td>
                    <td className="max-w-[240px] p-4 align-top text-[13px] leading-snug text-navy">
                      {s.notes || s.message ? `"${s.notes || s.message}"` : '—'}
                    </td>
                    <td className="whitespace-nowrap p-4 align-top text-[12px] text-muted">
                      {new Date(s.createdAt).toLocaleDateString()}{' '}
                      <span className="text-muted/70">
                        {new Date(s.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <AddInlineForm
                        action={updateStatusAction}
                        successMessage="Status updated!"
                        className="flex flex-col gap-1.5"
                      >
                        <input type="hidden" name="id" value={s.id} />
                        <select
                          name="status"
                          defaultValue={s.status}
                          className="rounded-lg border border-navy/15 px-2.5 py-1 text-[12.5px] text-navy outline-none transition-colors focus:border-navy"
                        >
                          {Object.values(SubmissionStatus).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <PendingSubmitButton pendingLabel="Updating…" className={smallBtn}>
                          Update
                        </PendingSubmitButton>
                      </AddInlineForm>
                    </td>
                    <td className="p-4 align-top text-right">
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
