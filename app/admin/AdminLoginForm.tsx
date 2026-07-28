'use client';

import { useActionState } from 'react';

import { loginAction, type LoginState } from './actions';

const initialState: LoginState = {};

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-[15px] text-navy outline-none transition focus:border-navy"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-navy/15 bg-white px-4 py-3 text-[15px] text-navy outline-none transition focus:border-navy"
        />
      </div>

      {state?.error && (
        <p role="alert" className="text-[13px] text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-navy px-8 py-3 text-[13px] font-medium uppercase tracking-widest2 text-white transition-colors hover:bg-navy-deep disabled:opacity-60"
      >
        {pending ? 'Signing In…' : 'Sign In'}
      </button>
    </form>
  );
}
