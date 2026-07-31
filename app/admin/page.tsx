import type { Metadata } from 'next';

import { cardClass } from '@/lib/adminUi';
import AdminLoginForm from './AdminLoginForm';

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-5">
      <div className={`w-full max-w-[400px] ${cardClass} sm:p-10`}>
        <h1 className="mb-1 font-serif text-[26px] text-navy">Admin Login</h1>
        <p className="mb-8 text-[14px] text-muted">
          Savannah Age Management Medicine
        </p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
