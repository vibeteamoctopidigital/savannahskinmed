'use client';

import { useTransition } from 'react';

import { alertError, alertSuccess, confirmDelete } from '@/lib/adminAlerts';

type Props = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  idFieldName?: string;
  itemLabel: string;
  className: string;
  label?: string;
};

/** Confirm-then-delete: a SweetAlert confirmation replaces the browser's
 * native `confirm()`, and a success toast confirms the delete completed. */
export default function DeleteButton({
  action,
  id,
  idFieldName = 'id',
  itemLabel,
  className,
  label = 'Delete',
}: Props) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    const confirmed = await confirmDelete(itemLabel);
    if (!confirmed) return;

    const formData = new FormData();
    formData.set(idFieldName, id);

    startTransition(async () => {
      try {
        await action(formData);
        await alertSuccess('Deleted');
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={className}>
      {pending ? 'Deleting…' : label}
    </button>
  );
}
