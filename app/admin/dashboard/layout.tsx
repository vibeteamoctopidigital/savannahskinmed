import type { Metadata } from 'next';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { getLoggedInAdminEmail } from '@/lib/data/admin';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Savannah Age Management Medicine',
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const email = await getLoggedInAdminEmail();
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <AdminSidebar email={email} />
      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-[1140px]">{children}</div>
      </main>
    </div>
  );
}

