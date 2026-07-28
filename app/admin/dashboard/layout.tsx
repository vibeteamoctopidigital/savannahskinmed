import type { Metadata } from 'next';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { ADMIN_FALLBACK_EMAIL } from '@/lib/data/shape';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f7]">
      <AdminSidebar email={ADMIN_FALLBACK_EMAIL} />
      <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-[1080px]">{children}</div>
      </main>
    </div>
  );
}
