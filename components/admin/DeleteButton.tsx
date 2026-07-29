'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { alertError, alertSuccess, confirmDelete } from '@/lib/adminAlerts';

type Props = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  idFieldName?: string;
  itemLabel?: string;
  className?: string;
  label?: string;
  /** Where to navigate after a successful delete — used on full-page
   * editors (e.g. deleting a card while viewing its own edit page), where
   * there's no list left on screen for a revalidate to refresh in place. */
  redirectTo?: string;
};

/** Confirm-then-delete: a SweetAlert confirmation replaces the browser's
 * native `confirm()`, and a success toast confirms the delete completed. */
export default function DeleteButton({
  action,
  id,
  idFieldName = 'id',
  itemLabel = 'this item',
  className = 'text-[12.5px] font-medium text-red-600 transition-colors hover:text-red-700 hover:underline underline-offset-2',
  label = 'Delete',
  redirectTo,
}: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleClick = async () => {
    const confirmed = await confirmDelete(itemLabel);
    if (!confirmed) return;

    const formData = new FormData();
    formData.set(idFieldName, id);

    startTransition(async () => {
      try {
        await action(formData);
        await alertSuccess('Deleted');
        if (redirectTo) router.push(redirectTo);
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
