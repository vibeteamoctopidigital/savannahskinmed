import type { Metadata } from 'next';

import { adminBody, adminHeading } from '@/lib/fonts';
import '../globals.css';

/**
 * Its own root layout (separate from `app/(marketing)/layout.tsx`) — the
 * admin panel must not inherit the public site's fixed Header/Footer chrome,
 * and deliberately uses its own font pairing (Sora/Inter) instead of the
 * public site's Playfair/Manrope.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${adminHeading.variable} ${adminBody.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
