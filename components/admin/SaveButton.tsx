'use client';

import { useTransition } from 'react';

import { alertError, alertSuccess } from '@/lib/adminAlerts';

type Props = {
  /** id of the `<form>` elsewhere in the DOM to read fields from (the
   * `form="..."` association pattern used across the admin content pages). */
  formId: string;
  action: (formData: FormData) => Promise<void>;
  successMessage: string;
  className: string;
  pendingLabel?: string;
  children: React.ReactNode;
};

/** Submits a form via a server action, then shows a SweetAlert success toast
 * (or error dialog) instead of leaving the admin guessing whether a save
 * actually went through. */
export default function SaveButton({
  formId,
  action,
  successMessage,
  className,
  pendingLabel = 'Saving…',
  children,
}: Props) {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    const form = document.getElementById(formId);
    if (!(form instanceof HTMLFormElement)) return;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await action(formData);
        await alertSuccess(successMessage);
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <button type="button" onClick={handleClick} disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
