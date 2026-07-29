'use client';

import { useState, useTransition } from 'react';

import { updateStatusAction } from '@/app/admin/dashboard/submissions/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';

export type SubmissionStatusType = 'NEW' | 'CONTACTED' | 'CLOSED';

const STATUS_OPTIONS: SubmissionStatusType[] = ['NEW', 'CONTACTED', 'CLOSED'];

type Props = {
  id: string;
  currentStatus: string;
};

const statusColors: Record<string, string> = {
  NEW: 'bg-amber-50 text-amber-800 border-amber-300 focus:ring-amber-400',
  CONTACTED: 'bg-sky-50 text-sky-800 border-sky-300 focus:ring-sky-400',
  CLOSED: 'bg-slate-50 text-slate-700 border-slate-300 focus:ring-slate-400',
};

export default function SubmissionStatusSelect({ id, currentStatus }: Props) {
  const [status, setStatus] = useState<string>(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value;
    setStatus(nextStatus);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('status', nextStatus);
        await updateStatusAction(formData);
        await alertSuccess(`Status updated to ${nextStatus}`);
      } catch {
        setStatus(currentStatus); // revert on error
        await alertError('Failed to update status');
      }
    });
  };

  return (
    <div className="relative inline-block">
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className={`appearance-none rounded-full border px-3 py-1.5 pr-8 text-[12px] font-semibold tracking-wide transition-all outline-none focus:ring-2 ${
          statusColors[status] || statusColors.NEW
        } ${isPending ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:shadow-sm'}`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s} className="bg-white text-navy font-medium">
            {s}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] opacity-70">
        ▼
      </div>
    </div>
  );
}
