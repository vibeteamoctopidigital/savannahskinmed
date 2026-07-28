'use client';

import { useRef, useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { deleteBlogPostAction, saveBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { inputClass, primaryBtn } from '@/lib/adminUi';

type BlogPostCardProps = {
  post: {
    id: string;
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    sortOrder: number;
    isActive: boolean;
  };
};

export default function AdminBlogPostCard({ post }: BlogPostCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(post.image);
  const [active, setActive] = useState(post.isActive);
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
    <form ref={formRef} className="group">
      <input type="hidden" name="postId" value={post.id} />
      <input type="hidden" name="image" value={image} />
      <input type="hidden" name="isActive" value={active ? 'on' : ''} />

      <div
        className={`overflow-hidden rounded-2xl border transition-all ${
          active ? 'border-navy/15 bg-white shadow-card' : 'border-navy/10 bg-gray-50 opacity-60'
        }`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy/5">
          {image ? (
            <img src={image} alt={post.imageAlt || post.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[13px] text-muted">No image</div>
          )}
          {post.title && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <h3 className="absolute bottom-4 left-5 right-5 font-serif text-[20px] leading-tight text-white text-shadow-hero">
                {post.title}
              </h3>
            </>
          )}
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12px] text-muted">Order {post.sortOrder + 1}</p>
            <label className="flex items-center gap-2 text-[12px] text-navy">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
              Active
            </label>
          </div>
          <p className="mb-3 text-[13px] leading-relaxed text-muted line-clamp-2">{post.description}</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="flex-1 rounded-lg border border-navy/15 px-3 py-2 text-[12px] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              {expanded ? 'Collapse' : 'Edit Post'}
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

        {expanded && (
          <div className="border-t border-navy/10 bg-cream/30 p-5">
            <div className="space-y-4">
              <CloudinaryUpload folder="blog" currentUrl={image} onUploaded={setImage} label="Post Image" />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[12px] text-muted">Image Alt Text</label>
                  <input name="imageAlt" defaultValue={post.imageAlt} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={String(post.sortOrder + 1)}
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[12px] text-muted">Title</label>
                  <input name="title" defaultValue={post.title} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-[12px] text-muted">Description</label>
                  <textarea name="description" defaultValue={post.description} rows={4} className={inputClass} />
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-navy/10 pt-4">
                <button type="button" onClick={handleSave} disabled={saving} className={primaryBtn}>
                  {saving ? 'Saving...' : 'Save Post'}
                </button>
                {saved && <span className="text-[12px] font-medium text-green-600">Saved!</span>}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
