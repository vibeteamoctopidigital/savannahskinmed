'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { SpecialCardVariant } from '@/lib/generated/prisma_v2/client';
import { normalizeSpecialLocations } from '@/lib/site';

/**
 * Reads the location checkboxes. Forms that do not carry the `hasLocations`
 * marker are left untouched, so an older form post cannot silently wipe an
 * offer's targeting.
 */
function readLocations(formData: FormData): string[] | undefined {
  if (formData.get('hasLocations') !== 'true') return undefined;
  return normalizeSpecialLocations(formData.getAll('locations').map(String));
}

function revalidateSpecialsPage() {
  revalidatePath('/specials');
  revalidatePath('/admin/dashboard/content/specials');
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
// Save or create a single card + its tiers
// ---------------------------------------------------------------------------

export async function saveSpecialCardAction(formData: FormData): Promise<void> {
  const id = String(formData.get('cardId') || formData.get('id') || '').trim();
  if (!id) throw new Error('Missing Special Card ID');

  const isNew = formData.get('isNew') === 'true' || id === 'new';
  if (isNew && id === 'new') {
    return createSpecialCardAction(formData);
  }

  const variantRaw = String(formData.get('variant') || 'STORY');
  const variant = variantRaw === 'TIERS' ? SpecialCardVariant.TIERS : SpecialCardVariant.STORY;
  const image = String(formData.get('image') || '').trim();
  const imageAlt = String(formData.get('imageAlt') || '').trim() || String(formData.get('title') || 'Offer');
  const title = String(formData.get('title') || '').trim() || null;
  const headline = String(formData.get('headline') || '').trim() || null;
  const description = String(formData.get('description') || '').trim() || null;
  const cta = String(formData.get('cta') || 'Claim Offer').trim();
  const sortOrder = parseInt(String(formData.get('sortOrder') || '1'), 10);
  const isActive = formData.get('isActive') === 'true' || formData.get('isActive') === 'on';
  const locations = readLocations(formData);

  // Read tier arrays if present
  const tierIds = formData.getAll('tierIds').map(String);
  const tierLabels = formData.getAll('tierLabels').map(String);
  const tierDetails = formData.getAll('tierDetails').map(String);

  await prisma.$transaction(async (tx) => {
    // 1. Upsert the card
    await tx.specialCard.upsert({
      where: { id },
      update: {
        variant,
        image,
        imageAlt,
        title,
        headline,
        description,
        cta,
        sortOrder,
        isActive,
        ...(locations ? { locations } : {}),
      },
      create: {
        id,
        variant,
        image,
        imageAlt,
        title,
        headline,
        description,
        cta,
        sortOrder,
        isActive,
        locations: locations ?? [],
      },
    });

    // 2. If tierLabels were passed, sync tiers
    if (tierLabels.length > 0) {
      // Delete existing tiers and insert the new ordered list
      await tx.specialCardTier.deleteMany({ where: { specialCardId: id } });
      for (let i = 0; i < tierLabels.length; i++) {
        const label = tierLabels[i]?.trim();
        const detail = tierDetails[i]?.trim() || '';
        if (label) {
          await tx.specialCardTier.create({
            data: {
              specialCardId: id,
              label,
              detail,
              sortOrder: i,
            },
          });
        }
      }
    } else if (tierIds.length > 0) {
      // Update individual existing tiers by ID
      for (const tid of tierIds) {
        await tx.specialCardTier.update({
          where: { id: tid },
          data: {
            label: String(formData.get(`tier-label-${tid}`) || ''),
            detail: String(formData.get(`tier-detail-${tid}`) || ''),
            sortOrder: parseInt(String(formData.get(`tier-order-${tid}`) || '0'), 10),
          },
        });
      }
    }
  });

  revalidateSpecialsPage();
}

// ---------------------------------------------------------------------------
// Delete / create
// ---------------------------------------------------------------------------

export async function deleteSpecialCardAction(formData: FormData): Promise<void> {
  const id = String(formData.get('id') || '').trim();
  if (!id) return;
  await prisma.specialCard.delete({ where: { id } });
  revalidateSpecialsPage();
}

export async function createSpecialCardAction(formData: FormData): Promise<void> {
  const variantRaw = String(formData.get('variant') || 'STORY');
  const variant = variantRaw === 'TIERS' ? SpecialCardVariant.TIERS : SpecialCardVariant.STORY;
  const id = String(formData.get('id') || '').trim();
  if (!id) throw new Error('Unique Slug / ID is required');

  const image = String(formData.get('image') || '').trim();
  const imageAlt = String(formData.get('imageAlt') || '').trim() || String(formData.get('title') || id);
  const title = String(formData.get('title') || '').trim() || null;
  const headline = String(formData.get('headline') || '').trim() || null;
  const description = String(formData.get('description') || '').trim() || null;
  const cta = String(formData.get('cta') || 'Claim Offer').trim();
  const sortOrder = parseInt(String(formData.get('sortOrder') || '1'), 10);
  const isActive = formData.get('isActive') === 'true' || formData.get('isActive') === 'on';
  const locations = readLocations(formData);

  // Read tier arrays if present
  const tierLabels = formData.getAll('tierLabels').map(String);
  const tierDetails = formData.getAll('tierDetails').map(String);

  await prisma.$transaction(async (tx) => {
    await tx.specialCard.create({
      data: {
        id,
        variant,
        image,
        imageAlt,
        title,
        headline,
        description,
        cta,
        sortOrder,
        isActive,
        locations: locations ?? [],
      },
    });

    if (tierLabels.length > 0) {
      for (let i = 0; i < tierLabels.length; i++) {
        const label = tierLabels[i]?.trim();
        const detail = tierDetails[i]?.trim() || '';
        if (label) {
          await tx.specialCardTier.create({
            data: {
              specialCardId: id,
              label,
              detail,
              sortOrder: i,
            },
          });
        }
      }
    } else if (variant === SpecialCardVariant.TIERS) {
      await tx.specialCardTier.createMany({
        data: [
          { specialCardId: id, label: 'Standard Tier', detail: 'Includes treatment consultation', sortOrder: 0 },
          { specialCardId: id, label: 'Premium Tier', detail: 'Includes follow-up session', sortOrder: 1 },
        ],
      });
    }
  });

  revalidateSpecialsPage();
}
