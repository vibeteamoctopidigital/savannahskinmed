'use client';

import { useRef, useTransition } from 'react';

import { alertError, alertSuccess } from '@/lib/adminAlerts';

type Props = {
  action: (formData: FormData) => Promise<void>;
  successMessage: string;
  className?: string;
  children: (pending: boolean) => React.ReactNode;
};

/** Wraps a small "Add ___" form (Add Location, Add Hours Row, etc.) so
 * submitting it shows a SweetAlert success toast and resets the fields,
 * instead of a plain native form POST with no feedback. */
export default function AddInlineForm({ action, successMessage, className, children }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(formData);
        formRef.current?.reset();
        await alertSuccess(successMessage);
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      {children(pending)}
    </form>
  );
}
