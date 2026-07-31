'use server';

import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';

import { ADMIN_EMAIL_COOKIE } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, '');
}

/** Independent from `updateSettingsAction` on purpose: each Branding upload
 * gets its own Save button, so saving the logo must never clobber the
 * favicon (or any other setting) with a blank value from a FormData that
 * only ever contains one field. */
export async function updateLogoAction(formData: FormData) {
  const logoUrl = String(formData.get('logoUrl') || '').trim();
  await prisma.siteSetting.update({ where: { id: 'main' }, data: { logoUrl } });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard/settings');
}

export async function updateFaviconAction(formData: FormData) {
  const faviconUrl = String(formData.get('faviconUrl') || '').trim();
  await prisma.siteSetting.update({ where: { id: 'main' }, data: { faviconUrl } });
  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard/settings');
}

async function upsertSocial(icon: string, label: string, href: string) {
  const existing = await prisma.socialLink.findFirst({ where: { icon } });

  if (!href.trim()) {
    if (existing) await prisma.socialLink.delete({ where: { id: existing.id } });
    return;
  }

  if (existing) {
    await prisma.socialLink.update({ where: { id: existing.id }, data: { label, href } });
  } else {
    const count = await prisma.socialLink.count();
    await prisma.socialLink.create({ data: { icon, label, href, sortOrder: count } });
  }
}

export async function updateSettingsAction(formData: FormData) {
  const get = (name: string) => String(formData.get(name) || '').trim();

  const phone = get('phone');
  const email = get('email');

  await prisma.siteSetting.upsert({
    where: { id: 'main' },
    update: {
      name: get('name'),
      description: get('description'),
      email,
      emailHref: email ? `mailto:${email}` : '',
      phone,
      phoneHref: phone ? `tel:+1${digitsOnly(phone)}` : '',
      address: get('address'),
      googleAnalyticsId: get('googleAnalyticsId'),
      metaPixelId: get('metaPixelId'),
      headerTrackingCode: get('headerTrackingCode'),
      footerTrackingCode: get('footerTrackingCode'),
    },
    create: {
      id: 'main',
      name: get('name'),
      description: get('description'),
      email,
      emailHref: email ? `mailto:${email}` : '',
      phone,
      phoneHref: phone ? `tel:+1${digitsOnly(phone)}` : '',
      address: get('address'),
      bookingUrl: '/contact-us',
      copyrightText: `Copyright © ${new Date().getFullYear()} ${get('name')}`,
      googleAnalyticsId: get('googleAnalyticsId'),
      metaPixelId: get('metaPixelId'),
      headerTrackingCode: get('headerTrackingCode'),
      footerTrackingCode: get('footerTrackingCode'),
    },
  });

  await upsertSocial('twitter', 'Twitter', get('twitter'));
  await upsertSocial('linkedin', 'LinkedIn', get('linkedin'));
  await upsertSocial('github', 'GitHub', get('github'));
  await upsertSocial('facebook', 'Facebook', get('facebook'));
  await upsertSocial('instagram', 'Instagram', get('instagram'));

  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard/settings');
}

export type AdminAccountState = { error?: string; success?: string };

export async function updateAdminAccountAction(
  _prevState: AdminAccountState,
  formData: FormData,
): Promise<AdminAccountState> {
  const currentPassword = String(formData.get('currentPassword') || '');
  const newEmail = String(formData.get('newEmail') || '').trim().toLowerCase();
  const newPassword = String(formData.get('newPassword') || '');
  const confirmPassword = String(formData.get('confirmPassword') || '');

  if (!currentPassword) {
    return { error: 'Current password is required to make changes.' };
  }

  // Find the first (only) admin user
  const admin = await prisma.adminUser.findFirst();
  if (!admin) {
    return { error: 'No admin account found.' };
  }

  // Verify current password
  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) {
    return { error: 'Current password is incorrect.' };
  }

  // Build update data
  const updateData: { email?: string; passwordHash?: string } = {};

  if (newEmail && newEmail !== admin.email) {
    // Check if email is already taken by another admin
    const existing = await prisma.adminUser.findUnique({ where: { email: newEmail } });
    if (existing && existing.id !== admin.id) {
      return { error: 'That email is already in use.' };
    }
    updateData.email = newEmail;
  }

  if (newPassword) {
    if (newPassword.length < 6) {
      return { error: 'New password must be at least 6 characters.' };
    }
    if (newPassword !== confirmPassword) {
      return { error: 'New password and confirmation do not match.' };
    }
    updateData.passwordHash = await bcrypt.hash(newPassword, 10);
  }

  if (Object.keys(updateData).length === 0) {
    return { error: 'No changes to save. Enter a new email or password.' };
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: updateData,
  });

  if (updateData.email) {
    try {
      const hdrs = await headers();
      const proto = hdrs.get('x-forwarded-proto') || hdrs.get('proto') || 'http';
      const isSecure = proto === 'https';
      const store = await cookies();
      store.set(ADMIN_EMAIL_COOKIE, updateData.email, {
        httpOnly: true,
        sameSite: 'lax',
        secure: isSecure,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    } catch {
      // Ignore cookie error in non-request context
    }
  }

  revalidatePath('/admin', 'layout');
  revalidatePath('/admin/dashboard', 'layout');
  revalidatePath('/admin/dashboard/settings');

  const changes: string[] = [];
  if (updateData.email) changes.push('email');
  if (updateData.passwordHash) changes.push('password');

  return { success: `Admin ${changes.join(' and ')} updated successfully.` };
}

