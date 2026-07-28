import type { Metadata } from 'next';

import AdminSidebar from '@/components/admin/AdminSidebar';
import { ADMIN_FALLBACK_EMAIL } from '@/lib/data/shape';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen gap-4 bg-[#f5f5f7] p-4">
      <AdminSidebar email={ADMIN_FALLBACK_EMAIL} />
      <main className="min-w-0 flex-1 overflow-y-auto px-2 py-4 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-[1080px]">{children}</div>
      </main>
    </div>
  );
}
