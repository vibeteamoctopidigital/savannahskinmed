'use client';

import { useRef, useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { deleteBlogPostAction, saveBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { dangerBtn, inputClass, primaryBtn, labelClass } from '@/lib/adminUi';

type BlogPostCardProps = {
  post: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
};

export default function AdminBlogPostCard({ post }: BlogPostCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [image, setImage] = useState(post.image);
  const [saving, startSaveTransition] = useTransition();
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startSaveTransition(async () => {
      await saveBlogPostAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  const handleDelete = async () => {
    if (!confirm(`Delete post "${post.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    const formData = new FormData();
    formData.set('id', post.id);
    await deleteBlogPostAction(formData);
  };

  return (
    <form ref={formRef} className="overflow-hidden rounded-2xl border border-navy/[0.06] bg-white shadow-card">
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="image" value={image} />

      <div className="p-5">
        <CloudinaryUpload folder="blog" currentUrl={image} onUploaded={setImage} label="Image" />

        <div className="mt-4 space-y-3">
          <div>
            <label className={labelClass}>Title</label>
            <input name="title" defaultValue={post.title} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea name="description" defaultValue={post.description} rows={4} className={inputClass} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 border-t border-navy/10 pt-4">
          <button type="button" onClick={handleSave} disabled={saving} className={primaryBtn}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={handleDelete} disabled={deleting} className={dangerBtn}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          {saved && <span className="text-[12px] font-medium text-green-600">Saved!</span>}
        </div>
      </div>
    </form>
  );
}
