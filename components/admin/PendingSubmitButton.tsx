'use client';

import { usePendingForm } from '@/components/admin/AddInlineForm';

type Props = {
  className: string;
  pendingLabel: string;
  children: React.ReactNode;
};

/** Submit button for `AddInlineForm` — disables and relabels itself while
 * that form's submission is in flight. */
export default function PendingSubmitButton({ className, pendingLabel, children }: Props) {
  const pending = usePendingForm();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  );
}
