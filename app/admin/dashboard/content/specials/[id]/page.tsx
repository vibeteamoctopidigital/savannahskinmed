import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import EditSpecialCardForm from '@/components/admin/EditSpecialCardForm';
import { prisma } from '@/lib/prisma';
import { SpecialCardVariant } from '@/lib/generated/prisma_v2/client';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSpecialCardPage({ params }: Props) {
  const { id } = await params;

  if (id === 'new') {
    return (
      <EditSpecialCardForm
        isNew={true}
        card={{
          id: 'new',
          variant: SpecialCardVariant.STORY,
          image: '',
          imageAlt: 'New Special Offer',
          title: '',
          headline: '',
          description: '',
          cta: 'Claim Offer',
          sortOrder: 1,
          isActive: true,
          locations: [],
          tiers: [
            { label: 'Standard Option', detail: 'Includes treatment consultation', sortOrder: 0 },
          ],
        }}
      />
    );
  }

  let card = null;
  try {
    card = await prisma.specialCard.findUnique({
      where: { id },
      include: {
        tiers: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  } catch {
    // Database connection error fallback
  }

  if (!card) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center space-y-4">
        <h1 className="font-serif text-[24px] text-navy">Offer Card Not Found</h1>
        <p className="text-[13.5px] text-muted">
          No special offer card with ID <code>{id}</code> was found in the database.
        </p>
        <Link
          href="/admin/dashboard/content/specials"
          className="inline-flex rounded-xl bg-navy px-5 py-2.5 text-[13.5px] font-medium text-white transition-opacity hover:opacity-90"
        >
          ← Back to Aesthetic Specials
        </Link>
      </div>
    );
  }

  return <EditSpecialCardForm card={card} isNew={false} />;
}
