'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import DeleteButton from '@/components/admin/DeleteButton';
import {
  deleteSpecialCardAction,
  saveSpecialCardAction,
} from '@/app/admin/dashboard/content/specials/actions';
import { cardClass, secondaryBtn } from '@/lib/adminUi';

type Tier = {
  id?: string;
  label: string;
  detail: string;
  sortOrder: number;
};

type SpecialCardProps = {
  card: {
    id: string;
    variant: string;
    image: string;
    imageAlt: string;
    title: string | null;
    headline: string | null;
    description: string | null;
    cta: string;
    sortOrder: number;
    isActive: boolean;
    tiers: Tier[];
  };
};

export default function AdminSpecialCard({ card }: SpecialCardProps) {
  const [active, setActive] = useState(card.isActive);
  const [saving, startSaveTransition] = useTransition();

  const handleToggleActive = () => {
    const nextActive = !active;
    setActive(nextActive);

    startSaveTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('cardId', card.id);
        formData.append('id', card.id);
        formData.append('image', card.image);
        formData.append('imageAlt', card.imageAlt);
        if (card.title) formData.append('title', card.title);
        if (card.headline) formData.append('headline', card.headline);
        if (card.description) formData.append('description', card.description);
        formData.append('cta', card.cta);
        formData.append('sortOrder', String(card.sortOrder));
        formData.append('variant', card.variant);
        formData.append('isActive', nextActive ? 'true' : 'false');

        await saveSpecialCardAction(formData);
      } catch {
        setActive(!nextActive);
      }
    });
  };

  return (
    <div className={`${cardClass} flex flex-col justify-between h-full space-y-6`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* Thumbnail Preview */}
        <div className="relative flex h-24 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-navy/10 bg-cream/60">
          {card.image ? (
            <Image
              src={card.image}
              alt={card.imageAlt || card.title || 'Offer'}
              fill
              className="object-cover object-center"
              sizes="112px"
            />
          ) : (
            <span className="text-[11px] font-medium text-muted">No Photo</span>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-navy/5 px-2 py-0.5 font-mono text-[11px] text-muted">
              {card.id}
            </span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-800">
              {card.variant}
            </span>
            {!active && (
              <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                Hidden
              </span>
            )}
          </div>

          <h3 className="font-serif text-[19px] font-medium text-navy leading-snug">
            {card.title || 'Untitled Offer'}
          </h3>

          {card.headline && (
            <p className="text-[13px] font-semibold text-rose-deep line-clamp-1">
              {card.headline}
            </p>
          )}

          {card.description && (
            <p className="text-[12.5px] text-muted line-clamp-2">
              {card.description}
            </p>
          )}

          <div className="pt-1 flex items-center gap-3 text-[11.5px] text-muted">
            <span>CTA: &ldquo;{card.cta}&rdquo;</span>
            <span>•</span>
            <span>{card.tiers?.length || 0} pricing option(s)</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between border-t border-navy/10 pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleActive}
            disabled={saving}
            className={`rounded-lg px-2.5 py-1 text-[12px] font-medium transition-colors ${
              active
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {saving ? 'Saving...' : active ? 'Active' : 'Hidden'}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <DeleteButton
            id={card.id}
            action={deleteSpecialCardAction}
            redirectTo="/admin/dashboard/content/specials"
          />
          <Link
            href={`/admin/dashboard/content/specials/${card.id}`}
            className={secondaryBtn}
          >
            Edit Offer Card →
          </Link>
        </div>
      </div>
    </div>
  );
}
