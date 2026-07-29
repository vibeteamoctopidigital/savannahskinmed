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
  const activeType = (type && type in SubmissionType ? (type as SubmissionType) : undefined);

  const result = await listSubmissions(activeType ? { type: activeType } : undefined);

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-[26px] text-navy">Submissions</h1>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = f.value === activeType;
          const href = f.value ? `/admin/dashboard/submissions?type=${f.value}` : '/admin/dashboard/submissions';
          return (
            <Link
              key={f.label}
              href={href}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                isActive ? 'border-navy bg-navy text-white' : 'border-navy/20 text-navy hover:border-navy'
              }`}
            >
              {f.label}
            </Link>
          );
        })}
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
        <div className="space-y-4">
          {result.data.map((s) => {
            const name = s.name ?? ([s.firstName, s.lastName].filter(Boolean).join(' ') || '—');
            return (
              <div key={s.id} className={`${cardClass} sm:p-6`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={badgeClass(s.type)}>{typeLabels[s.type]}</span>
                      {s.offerLabel && <span className="text-[12px] text-muted">{s.offerLabel}</span>}
                    </div>
                    <p className="mt-2 font-serif text-[19px] text-navy">{name}</p>
                    <p className="mt-1 text-[13px] text-muted">
                      {[s.email, s.phone].filter(Boolean).join(' · ') || 'No contact info'}
                    </p>
                    {s.location && <p className="text-[13px] text-muted">Location: {s.location}</p>}
                    {s.service && <p className="text-[13px] text-muted">Service: {s.service}</p>}
                    {(s.preferredDate || s.preferredTime) && (
                      <p className="text-[13px] text-muted">
                        Preferred: {s.preferredDate} {s.preferredTime}
                      </p>
                    )}
                    {(s.notes || s.message) && (
                      <p className="mt-2 max-w-[560px] text-[13px] leading-relaxed text-navy">
                        &ldquo;{s.notes || s.message}&rdquo;
                      </p>
                    )}
                    <p className="mt-2 text-[12px] text-muted">
                      {new Date(s.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <AddInlineForm
                      action={updateStatusAction}
                      successMessage="Status updated!"
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={s.id} />
                      <select
                        name="status"
                        defaultValue={s.status}
                        className="rounded-xl border border-navy/15 px-3 py-1.5 text-[13px] text-navy outline-none transition-colors focus:border-navy"
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

                    <DeleteButton
                      action={deleteSubmissionAction}
                      id={s.id}
                      itemLabel={`submission from ${name}`}
                      className={dangerBtn}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
