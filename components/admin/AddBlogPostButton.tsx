'use client';

import { useState } from 'react';
import { createBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { cardClass, inputClass, primaryBtn, smallBtn } from '@/lib/adminUi';

export default function AddBlogPostButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(!open)} className={primaryBtn}>
        + Add Post
      </button>

      {open && (
        <div className={`mt-6 ${cardClass}`}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-[16px] text-navy">New Blog Post</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[13px] font-medium text-muted hover:text-navy"
            >
              Cancel
            </button>
          </div>
          <form action={createBlogPostAction} className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Title</label>
              <input name="title" className={inputClass} required />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Description</label>
              <textarea name="description" rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue="1" className={inputClass} />
            </div>
            <div className="flex items-end">
              <button type="submit" className={smallBtn}>
                Add Post
              </button>
            </div>
            <p className="text-[11px] text-muted sm:col-span-2">
              Upload the image after creating the post, from its Edit panel.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
