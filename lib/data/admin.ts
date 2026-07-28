import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/prisma';
import { ADMIN_FALLBACK_EMAIL, ADMIN_FALLBACK_PASSWORD_HASH } from '@/lib/data/shape';

/**
 * Intentionally minimal: a plain email + bcrypt-compare check, no sessions,
 * no JWT, no lockout. Falls back to the seeded admin@gmail.com / admin123
 * credentials (same bcrypt hash the seed script inserts) when the database
 * isn't reachable yet, so /admin is testable before DATABASE_URL is set.
 */
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) return false;
    return bcrypt.compare(password, admin.passwordHash);
  } catch {
    if (email.toLowerCase() !== ADMIN_FALLBACK_EMAIL) return false;
    return bcrypt.compare(password, ADMIN_FALLBACK_PASSWORD_HASH);
  }
}
