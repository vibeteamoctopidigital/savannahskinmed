'use client';

import { useState } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { createBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { inputClass, labelClass, primaryBtn } from '@/lib/adminUi';

export default function AddBlogPostButton() {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  const close = () => {
    setOpen(false);
    setImage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSaving(true);
    try {
      await createBlogPostAction(formData);
      close();
      await alertSuccess('Post added!');
    } catch (err) {
      await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={primaryBtn}>
        + Add Post
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/40 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-navy/[0.06] bg-white p-6 shadow-menu sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-[18px] text-navy">New Blog Post</h3>
              <button
                type="button"
                onClick={close}
                className="text-[13px] font-medium text-muted hover:text-navy"
              >
                Cancel
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button type="submit" disabled={saving} className={primaryBtn}>
                {saving ? 'Adding…' : 'Add Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
