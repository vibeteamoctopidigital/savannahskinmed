'use client';

import { useState, useActionState } from 'react';

import {
  updateAdminAccountAction,
  type AdminAccountState,
} from '@/app/admin/dashboard/settings/actions';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-[14px] text-navy outline-none focus:border-navy';

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
      <label className="mb-1.5 block text-[13px] font-medium text-navy">
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

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-1 font-serif text-[19px] text-navy">Admin Account</h2>
      <p className="mb-5 text-[13px] text-muted">
        Change your admin login email and password
      </p>

      <form action={formAction} className="space-y-4">
        {state.error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            {state.error}
          </div>
        )}
        {state.success && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13px] text-green-700">
            {state.success}
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-navy">
            Email
          </label>
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

        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
        >
          {pending ? 'Updating…' : 'Update Account'}
        </button>
      </form>
    </section>
  );
}
