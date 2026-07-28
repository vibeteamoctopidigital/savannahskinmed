'use client';

import { useEffect, useRef, useState, useActionState } from 'react';

import {
  updateAdminAccountAction,
  type AdminAccountState,
} from '@/app/admin/dashboard/settings/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, inputClass, labelClass, primaryBtn } from '@/lib/adminUi';

const initialState: AdminAccountState = {};

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PasswordField({
  label,
  name,
  placeholder,
  required,
  hint,
  className = '',
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          type={visible ? 'text' : 'password'}
          required={required}
          placeholder={placeholder}
          className={`${inputClass} pr-10`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 transition-colors hover:text-navy"
          tabIndex={-1}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {hint && <p className="mt-1 text-[12px] text-muted">{hint}</p>}
    </div>
  );
}

export default function AdminAccountForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, pending] = useActionState(updateAdminAccountAction, initialState);
  const lastHandled = useRef<AdminAccountState>(initialState);

  useEffect(() => {
    if (state === lastHandled.current) return;
    lastHandled.current = state;
    if (state.success) alertSuccess(state.success);
    if (state.error) alertError('Could not update account', state.error);
  }, [state]);

  return (
    <section className={cardClass}>
      <h2 className="mb-1 font-serif text-[19px] text-navy">Admin Account</h2>
      <p className="mb-5 text-[13px] text-muted">
        Change your admin login email and password
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <label className={labelClass}>Email</label>
          <input
            name="newEmail"
            type="email"
            defaultValue={currentEmail}
            placeholder="admin@example.com"
            className={inputClass}
          />
          <p className="mt-1 text-[12px] text-muted">
            Update your admin login email address
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordField
            label="New Password"
            name="newPassword"
            placeholder="••••••••"
            hint="Leave blank to keep current password"
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="••••••••"
          />
        </div>

        <div className="border-t border-navy/10 pt-4">
          <PasswordField
            label="Current Password"
            name="currentPassword"
            placeholder="Enter your current password to confirm changes"
            required
            hint="Required to verify your identity"
            className="max-w-md"
          />
        </div>

        <button type="submit" disabled={pending} className={primaryBtn}>
          {pending ? 'Updating…' : 'Update Account'}
        </button>
      </form>
    </section>
  );
}
