import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from '@/lib/adminAuth';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const store = await cookies();
  if (store.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5">
      <div className="w-full max-w-[400px] rounded-2xl bg-white p-8 shadow-card sm:p-10">
        <h1 className="mb-1 font-serif text-[26px] text-navy">Admin Login</h1>
        <p className="mb-8 text-[14px] text-muted">
          Savannah Age Management Medicine
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
