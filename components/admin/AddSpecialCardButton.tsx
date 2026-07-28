'use client';

import { useState } from 'react';
import { createSpecialCardAction } from '@/app/admin/dashboard/content/specials/actions';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';

export default function AddSpecialCardButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
      >
        + Add Card
      </button>

      {open && (
        <div className="mt-6 rounded-2xl border border-navy/15 bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-[16px] text-navy">New Offer Card</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[13px] font-medium text-muted hover:text-navy"
            >
              Cancel
            </button>
          </div>
          <form action={createSpecialCardAction} className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12px] text-muted">ID (unique slug)</label>
              <input name="id" placeholder="e.g. spring-facial" className={inputClass} required />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Variant</label>
              <select name="variant" defaultValue="STORY" className={inputClass}>
                <option value="STORY">Story (headline + description)</option>
                <option value="TIERS">Tiers (bundle pricing)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Title (overlay on image)</label>
              <input name="title" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">CTA Label</label>
              <input name="cta" defaultValue="Claim" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Headline (Story cards)</label>
              <input name="headline" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Description (Story cards)</label>
              <textarea name="description" rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue="1" className={inputClass} />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="rounded-lg border border-navy/20 px-4 py-2 text-[12px] font-medium text-navy hover:bg-navy hover:text-white"
              >
                Add Card
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
