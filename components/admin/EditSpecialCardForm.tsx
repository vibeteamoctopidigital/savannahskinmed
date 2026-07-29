'use client';

import React, { useEffect, useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import DeleteButton from '@/components/admin/DeleteButton';
import {
  deleteSpecialCardAction,
  saveSpecialCardAction,
} from '@/app/admin/dashboard/content/specials/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, dangerBtn, inputClass, primaryBtn, toSlug } from '@/lib/adminUi';

type Tier = {
  id?: string;
  label: string;
  detail: string;
  sortOrder: number;
};

type SpecialCardData = {
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

type Props = {
  card: SpecialCardData;
  isNew?: boolean;
};

export default function EditSpecialCardForm({ card, isNew = false }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [image, setImage] = useState(card.image || '');
  const [active, setActive] = useState(card.isActive);
  const [variant, setVariant] = useState(card.variant || 'STORY');
  const [title, setTitle] = useState(card.title || '');
  const [slug, setSlug] = useState(isNew ? '' : card.id);
  const slugManuallyEdited = useRef(false);

  useEffect(() => {
    if (isNew && !slugManuallyEdited.current && title) {
      setSlug(toSlug(title));
    }
  }, [title, isNew]);

  const [tiers, setTiers] = useState<Tier[]>(
    card.tiers && card.tiers.length > 0
      ? card.tiers
      : [
          { label: 'Standard Tier', detail: 'Includes consultation & customized treatment', sortOrder: 0 },
        ],
  );
  const [saving, startSaveTransition] = useTransition();

  const handleAddTier = () => {
    setTiers([
      ...tiers,
      { label: `New Option`, detail: 'Details here...', sortOrder: tiers.length },
    ]);
  };

  const handleRemoveTier = (index: number) => {
    setTiers(tiers.filter((_, idx) => idx !== index));
  };

  const handleTierChange = (index: number, field: 'label' | 'detail', value: string) => {
    const updated = [...tiers];
    updated[index] = { ...updated[index], [field]: value };
    setTiers(updated);
  };

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    // Append tier arrays explicitly
    tiers.forEach((tier) => {
      formData.append('tierLabels', tier.label);
      formData.append('tierDetails', tier.detail);
    });

    startSaveTransition(async () => {
      try {
        await saveSpecialCardAction(formData);
        await alertSuccess(isNew ? 'Offer card created successfully!' : 'Offer card saved successfully!');
        router.push('/admin/dashboard/content/specials');
        router.refresh();
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/dashboard/content/specials"
            className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-1.5 text-[13px] font-medium text-navy transition-colors hover:bg-navy/10"
          >
            ← Back to Aesthetic Specials
          </Link>
          <h1 className="font-serif text-[28px] text-navy">
            {isNew ? 'Create New Offer Card' : `Edit Offer: ${card.title || card.id}`}
          </h1>
          <p className="text-[13.5px] text-muted">
            Customize the offer artwork, headline, promotional description, and pricing tiers below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${
              active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-600' : 'bg-slate-500'}`}
            />
            {active ? 'Active on Public Site' : 'Hidden from Site'}
          </span>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="rounded-3xl border border-navy/10 bg-white p-8 shadow-card">
        <form ref={formRef} className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <input type="hidden" name="cardId" value={card.id} />
          <input type="hidden" name="image" value={image} />
          <input type="hidden" name="isActive" value={active ? 'true' : 'false'} />
          <input type="hidden" name="isNew" value={isNew ? 'true' : 'false'} />

          {/* 2-Column Responsive Grid */}
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
            {/* Left Column: Offer Image */}
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-cream/50 p-6 text-center">
              <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-navy/5 shadow-md">
                {image ? (
                  <Image
                    src={image}
                    alt={card.imageAlt || card.title || 'Offer'}
                    fill
                    className="object-cover object-center"
                    sizes="280px"
                  />
                ) : (
                  <span className="text-[13px] font-medium text-muted">No Photo Selected</span>
                )}
              </div>

              <div>
                <p className="font-serif text-[15px] font-medium text-navy">Offer Photo</p>
                <p className="text-[12px] text-muted">16:9 or square ratio recommended</p>
              </div>

              <div className="w-full space-y-2.5">
                <CloudinaryUpload
                  folder="savannahskinmed/specials"
                  currentUrl={image}
                  onUploaded={(url) => setImage(url)}
                  label="Upload Offer Photo"
                />
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or paste photo URL..."
                  className={`${inputClass} text-center text-[12px] font-mono`}
                />
              </div>
            </div>

            {/* Right Column: Main Content Fields */}
            <div className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Unique Slug / ID <span className="text-rose-deep">*</span>
                  </label>
                  {isNew ? (
                    <input
                      name="id"
                      value={slug}
                      onChange={(e) => {
                        slugManuallyEdited.current = true;
                        setSlug(e.target.value);
                      }}
                      placeholder="e.g. spring-facial-promo"
                      className={inputClass}
                      required
                    />
                  ) : (
                    <div className="flex items-center h-[42px] rounded-xl border border-navy/10 bg-navy/5 px-3.5 text-[13.5px] font-mono text-muted">
                      {card.id}
                      <input type="hidden" name="id" value={card.id} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Layout Variant
                  </label>
                  <select
                    name="variant"
                    value={variant}
                    onChange={(e) => setVariant(e.target.value)}
                    className={inputClass}
                  >
                    <option value="STORY">STORY (Editorial narrative card)</option>
                    <option value="TIERS">TIERS (Tiered package with options)</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Offer Title / Badge <span className="text-rose-deep">*</span>
                  </label>
                  <input
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Seasonal Package"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Main Headline
                  </label>
                  <input
                    name="headline"
                    defaultValue={card.headline || ''}
                    placeholder="e.g. Radiant Skin Transformation"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-navy">
                  Description / Offer Copy
                </label>
                <textarea
                  name="description"
                  defaultValue={card.description || ''}
                  rows={4}
                  placeholder="Describe the aesthetic treatment, benefits, and special promotional pricing..."
                  className={inputClass}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Button Copy (CTA)
                  </label>
                  <input
                    name="cta"
                    defaultValue={card.cta || 'Claim Offer'}
                    placeholder="e.g. Book Special Now"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    name="sortOrder"
                    defaultValue={card.sortOrder}
                    className={inputClass}
                    min={0}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-navy">
                    Display Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setActive(!active)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                      active
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>{active ? 'Active (Visible)' : 'Hidden (Draft)'}</span>
                    <span
                      className={`h-3 w-3 rounded-full ${
                        active ? 'bg-emerald-600' : 'bg-slate-400'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Tiers / Bullets Management */}
              <div className="space-y-4 rounded-2xl border border-navy/10 bg-navy/[0.015] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-[16px] font-semibold text-navy">
                      Offer Options / Pricing Tiers
                    </h3>
                    <p className="text-[12px] text-muted">
                      Add bullet options or tiered packages displayed on this offer card.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTier}
                    className="rounded-lg bg-navy/10 px-3 py-1.5 text-[12px] font-semibold text-navy hover:bg-navy/15"
                  >
                    + Add Option / Tier
                  </button>
                </div>

                {tiers.length === 0 ? (
                  <p className="py-4 text-center text-[13px] text-muted">
                    No tiers added yet. Click &ldquo;+ Add Option / Tier&rdquo; to add pricing options.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {tiers.map((tier, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-3 rounded-xl border border-navy/10 bg-white p-4 sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0 flex-1 space-y-2">
                          <input
                            type="text"
                            value={tier.label}
                            onChange={(e) => handleTierChange(index, 'label', e.target.value)}
                            placeholder="Option label (e.g. Single Session - $199)"
                            className={inputClass}
                          />
                          <input
                            type="text"
                            value={tier.detail}
                            onChange={(e) => handleTierChange(index, 'detail', e.target.value)}
                            placeholder="Detail text (e.g. Includes full facial + serum application)"
                            className={inputClass}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveTier(index)}
                          className="self-end rounded-lg p-2 text-rose-500 hover:bg-rose-50 sm:self-center"
                          title="Remove tier"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-6">
            <Link
              href="/admin/dashboard/content/specials"
              className="text-[13.5px] font-medium text-muted hover:text-navy"
            >
              Cancel and Return
            </Link>

            <div className="flex items-center gap-3">
              {!isNew && (
                <DeleteButton
                  id={card.id}
                  action={deleteSpecialCardAction}
                  redirectTo="/admin/dashboard/content/specials"
                />
              )}
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={primaryBtn}
              >
                {saving
                  ? 'Saving...'
                  : isNew
                    ? 'Create Offer Card'
                    : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
