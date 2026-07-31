import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import { ADMIN_FALLBACK_EMAIL } from '@/lib/data/shape';

/**
 * Deliberately minimal "no real auth system" gate: a single cookie whose
 * value is checked by strict string equality. No JWT, no session store, no
 * expiry logic beyond the cookie's own maxAge.
 */
export const ADMIN_SESSION_COOKIE = 'sam_admin_session';
export const ADMIN_SESSION_VALUE = 'sam-7f2c9e6a1d4b8f03-admin-session';
export const ADMIN_EMAIL_COOKIE = 'sam_admin_email';

export async function getLoggedInAdminEmail(): Promise<string> {
  try {
    const store = await cookies();
    const cookieEmail = store.get(ADMIN_EMAIL_COOKIE)?.value?.trim();
    if (cookieEmail) {
      return cookieEmail;
    }
  } catch {
    // Ignore cookie read error in non-request contexts
  }

  try {
    const admin = await prisma.adminUser.findFirst();
    if (admin?.email) {
      return admin.email;
    }
  } catch {
    // Database fallback
  }

  return ADMIN_FALLBACK_EMAIL;
}

