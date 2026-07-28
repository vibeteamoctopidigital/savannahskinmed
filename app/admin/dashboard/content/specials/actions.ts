'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { SpecialCardVariant } from '@/lib/generated/prisma/client';

function revalidateSpecialsPage() {
  revalidatePath('/specials');
  revalidatePath('/admin/dashboard/content/specials');
}

function toOrder(raw: FormDataEntryValue | null) {
  return Math.max(0, Number(raw || 1) - 1);
}

// ---------------------------------------------------------------------------
// Save hero / heading settings only
// ---------------------------------------------------------------------------

export async function saveHeroAction(formData: FormData) {
  const get = (name: string) => String(formData.get(name) || '').trim();

  await prisma.specialsPageSettings.upsert({
    where: { id: 'main' },
    update: {
      heroTitle: get('heroTitle'),
      heroIntro: get('heroIntro'),
      heroImage: get('heroImage'),
      heroImageAlt: get('heroImageAlt'),
      offersHeading: get('offersHeading'),
    },
    create: {
      id: 'main',
      heroTitle: get('heroTitle'),
      heroIntro: get('heroIntro'),
      heroImage: get('heroImage'),
      heroImageAlt: get('heroImageAlt'),
      offersHeading: get('offersHeading'),
    },
  });

  revalidateSpecialsPage();
}

// ---------------------------------------------------------------------------
// Save a single card + its tiers
// ---------------------------------------------------------------------------

export async function saveSpecialCardAction(formData: FormData) {
  const id = String(formData.get('cardId') || '');
  if (!id) return;

  const cardId = id;
  const tierIds = formData.getAll('tierIds').map(String);

  await prisma.$transaction([
    prisma.specialCard.update({
      where: { id: cardId },
      data: {
        image: String(formData.get('image') || ''),
        imageAlt: String(formData.get('imageAlt') || ''),
        title: String(formData.get('title') || '') || null,
        headline: String(formData.get('headline') || '') || null,
        description: String(formData.get('description') || '') || null,
        cta: String(formData.get('cta') || 'Claim'),
        sortOrder: toOrder(formData.get('sortOrder')),
        isActive: formData.get('isActive') === 'on',
      },
    }),
    ...tierIds.map((tid) =>
      prisma.specialCardTier.update({
        where: { id: tid },
        data: {
          label: String(formData.get(`tier-label-${tid}`) || ''),
          detail: String(formData.get(`tier-detail-${tid}`) || ''),
          sortOrder: toOrder(formData.get(`tier-order-${tid}`)),
        },
      }),
    ),
  ]);

  revalidateSpecialsPage();
}

// ---------------------------------------------------------------------------
// Delete / create
// ---------------------------------------------------------------------------

export async function deleteSpecialCardAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.specialCard.delete({ where: { id } });
  revalidateSpecialsPage();
}

export async function createSpecialCardAction(formData: FormData) {
  const variant = String(formData.get('variant')) === 'TIERS' ? SpecialCardVariant.TIERS : SpecialCardVariant.STORY;
  const id = String(formData.get('id') || '').trim();
  if (!id) return;

  await prisma.specialCard.create({
    data: {
      id,
      variant,
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title: String(formData.get('title') || '') || null,
      headline: String(formData.get('headline') || '') || null,
      description: String(formData.get('description') || '') || null,
      cta: String(formData.get('cta') || 'Claim'),
      sortOrder: toOrder(formData.get('sortOrder')),
      isActive: true,
      tiers:
        variant === SpecialCardVariant.TIERS
          ? {
              create: [
                { label: 'Tier 1 label', detail: 'Tier 1 detail', sortOrder: 0 },
                { label: 'Tier 2 label', detail: 'Tier 2 detail', sortOrder: 1 },
              ],
            }
          : undefined,
    },
  });
  revalidateSpecialsPage();
}
