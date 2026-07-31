'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { verifyAdminCredentials } from '@/lib/data/admin';
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, ADMIN_EMAIL_COOKIE } from '@/lib/adminAuth';

export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const valid = await verifyAdminCredentials(email, password);
  if (!valid) {
    return { error: 'Invalid email or password.' };
  }

  const hdrs = await headers();
  const proto = hdrs.get('x-forwarded-proto') || hdrs.get('proto') || 'http';
  const isSecure = proto === 'https';

  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecure,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  store.set(ADMIN_EMAIL_COOKIE, email, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecure,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect('/admin/dashboard');
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
  store.delete(ADMIN_EMAIL_COOKIE);
  redirect('/admin');
}

