'use client';

import { useState } from 'react';
import { createSpecialCardAction } from '@/app/admin/dashboard/content/specials/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { inputClass, primaryBtn } from '@/lib/adminUi';

export default function AddSpecialCardButton() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const close = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSaving(true);
    try {
      await createSpecialCardAction(formData);
      close();
      await alertSuccess('Card added!');
    } catch (err) {
      await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={primaryBtn}>
        + Add Card
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-navy/[0.06] bg-white p-6 shadow-menu sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-[18px] text-navy">New Offer Card</h3>
              <button
                type="button"
                onClick={close}
                className="text-[13px] font-medium text-muted hover:text-navy"
              >
                Cancel
              </button>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
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
              <div className="flex items-end sm:col-span-2">
                <button type="submit" disabled={saving} className={primaryBtn}>
                  {saving ? 'Adding…' : 'Add Card'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
