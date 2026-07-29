'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { HoursKind } from '@/lib/generated/prisma_v2/client';

function revalidatePublicPages() {
  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard/content/site');
}

function toAddressLines(raw: string) {
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

function toOrder(raw: FormDataEntryValue | null) {
  return Math.max(0, Number(raw || 1) - 1);
}

// ---------------------------------------------------------------------------
// Bulk save — every existing Location / LocationHours field on the page.
// These fields live outside this form in the DOM and are associated via the
// HTML `form="site-save"` attribute (nested <form> elements aren't valid
// HTML, and this is the standards-based way around it).
// ---------------------------------------------------------------------------

export async function saveAllAction(formData: FormData) {
  const locationIds = formData.getAll('locationIds').map(String);
  const hourIds = formData.getAll('hourIds').map(String);

  await prisma.$transaction([
    ...locationIds.map((id) =>
      prisma.location.update({
        where: { id },
        data: {
          city: String(formData.get(`loc-city-${id}`) || ''),
          badge: String(formData.get(`loc-badge-${id}`) || '') || null,
          addressLines: toAddressLines(String(formData.get(`loc-address-${id}`) || '')),
          sortOrder: toOrder(formData.get(`loc-order-${id}`)),
        },
      }),
    ),
    ...hourIds.map((id) =>
      prisma.locationHours.update({
        where: { id },
        data: {
          kind: String(formData.get(`hour-kind-${id}`)) === 'SHORT' ? HoursKind.SHORT : HoursKind.FULL,
          days: String(formData.get(`hour-days-${id}`) || ''),
          time: String(formData.get(`hour-time-${id}`) || ''),
          sortOrder: toOrder(formData.get(`hour-order-${id}`)),
        },
      }),
    ),
  ]);

  revalidatePublicPages();
}

// ---------------------------------------------------------------------------
// Delete / create — each of these is its own small, self-contained <form>
// (not sharing the bulk-save form), so plain field names are unambiguous.
// ---------------------------------------------------------------------------

export async function deleteLocationAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.location.delete({ where: { id } });
  revalidatePublicPages();
}

export async function deleteLocationHourAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.locationHours.delete({ where: { id } });
  revalidatePublicPages();
}

export async function createLocationAction(formData: FormData) {
  await prisma.location.create({
    data: {
      city: String(formData.get('city') || ''),
      badge: String(formData.get('badge') || '') || null,
      addressLines: toAddressLines(String(formData.get('addressLines') || '')),
      sortOrder: toOrder(formData.get('sortOrder')),
    },
  });
  revalidatePublicPages();
}

export async function createLocationHourAction(formData: FormData) {
  const locationId = String(formData.get('locationId') || '');
  if (!locationId) return;

  await prisma.locationHours.create({
    data: {
      locationId,
      kind: String(formData.get('kind')) === 'SHORT' ? HoursKind.SHORT : HoursKind.FULL,
      days: String(formData.get('days') || ''),
      time: String(formData.get('time') || ''),
      sortOrder: toOrder(formData.get('sortOrder')),
    },
  });
  revalidatePublicPages();
}
