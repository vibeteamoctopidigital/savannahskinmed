'use client';

import { useState } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { createBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { cardClass, inputClass, labelClass, primaryBtn } from '@/lib/adminUi';

export default function AddBlogPostButton() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

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
          <form action={createBlogPostAction} className="space-y-4">
            <input type="hidden" name="image" value={image} />
            <CloudinaryUpload folder="blog" currentUrl={image} onUploaded={setImage} label="Image" />
            <div>
              <label className={labelClass}>Title</label>
              <input name="title" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" rows={3} className={inputClass} />
            </div>
            <button type="submit" className={primaryBtn}>
              Add Post
            </button>
          </form>
        </div>
      )}
    </>
  );
}
