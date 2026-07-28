import type { Metadata } from 'next';

import { manrope, playfair } from '@/lib/fonts';
import '../globals.css';

/**
 * Its own root layout (separate from `app/(marketing)/layout.tsx`) — the
 * admin panel must not inherit the public site's fixed Header/Footer chrome.
 */
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
