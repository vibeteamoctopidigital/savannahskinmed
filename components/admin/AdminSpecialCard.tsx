'use client';

import { useRef, useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import {
  deleteSpecialCardAction,
  saveSpecialCardAction,
} from '@/app/admin/dashboard/content/specials/actions';

type Tier = { id: string; label: string; detail: string; sortOrder: number };

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

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';

export default function AdminSpecialCard({ card }: SpecialCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(card.image);
  const [active, setActive] = useState(card.isActive);
  const [saving, startSaveTransition] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startSaveTransition(async () => {
      await saveSpecialCardAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleDelete = async () => {
    if (!confirm(`Delete card "${card.id}"? This cannot be undone.`)) return;
    setDeleting(true);
    const formData = new FormData();
    formData.set('id', card.id);
    await deleteSpecialCardAction(formData);
  };

  return (
    <form ref={formRef} className="group">
      <input type="hidden" name="cardId" value={card.id} />
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="isActive" value={active ? 'on' : ''} />

      <div
        className={`overflow-hidden rounded-2xl border transition-all ${
          active ? 'border-navy/15 bg-white shadow-card' : 'border-navy/10 bg-gray-50 opacity-60'
        }`}
      >
        {/* Visual Card Header */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5">
          {image ? (
            <img
              src={image}
              alt={card.imageAlt || card.title || card.id}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[13px] text-muted">
              No image
            </div>
          )}
          {card.title && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <h3 className="absolute bottom-4 left-5 right-5 font-serif text-[20px] leading-tight text-white text-shadow-hero">
                {card.title}
              </h3>
            </>
          )}
          <div className="absolute left-3 top-3">
            <span className="rounded-md bg-navy/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              {card.variant}
            </span>
          </div>
        </div>

        {/* Card body — compact summary */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-semibold text-navy">{card.id}</p>
            <label className="flex items-center gap-2 text-[12px] text-navy">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
              />
              Active
            </label>
          </div>
          {card.variant === 'STORY' && card.headline && (
            <p className="mb-1 text-[14px] font-bold text-navy">{card.headline}</p>
          )}
          {card.variant === 'STORY' && card.description && (
            <p className="mb-3 text-[13px] leading-relaxed text-muted line-clamp-2">
              {card.description}
            </p>
          )}
          {card.variant === 'TIERS' && card.tiers.length > 0 && (
            <div className="mb-3 space-y-1">
              {card.tiers.map((tier) => (
                <div key={tier.id} className="flex justify-between text-[13px]">
                  <span className="text-muted">{tier.label}</span>
                  <span className="font-semibold text-navy">{tier.detail}</span>
                </div>
              ))}
            </div>
          )}
          <p className="mb-3 text-[12px] text-muted">
            CTA: <span className="font-medium text-navy">{card.cta}</span>
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex-1 rounded-lg border border-navy/15 px-3 py-2 text-[12px] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {expanded ? 'Collapse' : 'Edit Card'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg px-3 py-2 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Expanded editor */}
        {expanded && (
          <div className="border-t border-navy/10 bg-cream/30 p-5">
            <div className="space-y-4">
              <CloudinaryUpload
                folder="specials"
                currentUrl={image}
                onUploaded={setImage}
                label="Card Image"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[12px] text-muted">Image Alt Text</label>
                  <input
                    name="imageAlt"
                    defaultValue={card.imageAlt}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] text-muted">Title (overlay on image)</label>
                  <input
                    name="title"
                    defaultValue={card.title ?? ''}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] text-muted">CTA Label</label>
                  <input
                    name="cta"
                    defaultValue={card.cta}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={String(card.sortOrder + 1)}
                    className={inputClass}
                  />
                </div>
              </div>

              {card.variant === 'STORY' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[12px] text-muted">Headline</label>
                    <input
                      name="headline"
                      defaultValue={card.headline ?? ''}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-[12px] text-muted">Description</label>
                    <textarea
                      name="description"
                      defaultValue={card.description ?? ''}
                      rows={3}
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {card.variant === 'TIERS' && card.tiers.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[13px] font-semibold text-navy">Pricing Tiers</p>
                  {card.tiers.map((tier) => (
                    <div key={tier.id} className="grid items-end gap-2 sm:grid-cols-[2fr_2fr_auto]">
                      <input type="hidden" name="tierIds" value={tier.id} />
                      <div>
                        <label className="mb-1 block text-[12px] text-muted">Label</label>
                        <input
                          name={`tier-label-${tier.id}`}
                          defaultValue={tier.label}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[12px] text-muted">Detail</label>
                        <input
                          name={`tier-detail-${tier.id}`}
                          defaultValue={tier.detail}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-[12px] text-muted">Order</label>
                        <input
                          name={`tier-order-${tier.id}`}
                          type="number"
                          defaultValue={String(tier.sortOrder + 1)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Per-card save button */}
              <div className="flex items-center gap-3 border-t border-navy/10 pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-lg bg-navy px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Card'}
                </button>
                {saved && (
                  <span className="text-[12px] font-medium text-green-600">Saved!</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
