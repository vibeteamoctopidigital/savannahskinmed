'use client';

import { useEffect, useState, useRef, useTransition, KeyboardEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { saveBlogPostAction, deleteBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import DeleteButton from '@/components/admin/DeleteButton';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { dangerBtn, inputClass, labelClass, toSlug } from '@/lib/adminUi';
import type { AdminBlogPostData } from '@/lib/data/blog';

type Props = {
  post?: AdminBlogPostData;
};

const CATEGORIES = [
  'Aesthetic Medicine',
  'Skin Care',
  'Injectables',
  'Laser Treatments',
  'Wellness',
  'Anti-Aging',
  'Med Spa News',
];

const PRESET_IMAGES = [
  '/images/photo-content-10-img.jpg',
  '/images/photo-content-11-img.jpg',
  '/images/photo-content-12-img.jpg',
  '/images/before-after-19-img.jpg',
  '/images/before-after-20-img.jpg',
  '/images/clinic-hero.jpg',
  '/images/banner-13-bg.jpg',
];

export default function EditBlogPostForm({ post }: Props) {
  const router = useRouter();
  const isNew = !post || post.id === 'new';

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const slugManuallyEdited = useRef(!isNew);

  useEffect(() => {
    if (isNew && !slugManuallyEdited.current && title) {
      setSlug(toSlug(title));
    }
  }, [title, isNew]);

  const [category, setCategory] = useState(post?.category || 'Aesthetic Medicine');
  const [tags, setTags] = useState(post?.tags || 'Aesthetics, Skin Care');
  const [author, setAuthor] = useState(post?.author || 'Savannah Age Management Medicine Team');
  const [readingTime, setReadingTime] = useState(post?.readingTime || 5);
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [description, setDescription] = useState(
    post?.description || ''
  );

  // SEO state
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post?.metaDescription || '');
  const [keywordsList, setKeywordsList] = useState<string[]>(
    post?.keywords
      ? post.keywords.split(',').map((k) => k.trim()).filter(Boolean)
      : ['Aesthetics', 'Med Spa', 'Savannah']
  );
  const [newKeywordInput, setNewKeywordInput] = useState('');

  // Date & Media Library modal state
  const [publishDate, setPublishDate] = useState(
    post?.createdAt || new Date().toISOString().split('T')[0]
  );
  const [showMediaModal, setShowMediaModal] = useState(false);

  const [saving, startSaveTransition] = useTransition();

  const handleAddKeyword = () => {
    const trimmed = newKeywordInput.trim();
    if (trimmed && !keywordsList.includes(trimmed)) {
      setKeywordsList([...keywordsList, trimmed]);
      setNewKeywordInput('');
    }
  };

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywordsList(keywordsList.filter((k) => k !== kw));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.set('postId', post?.id || 'new');
    formData.set('title', title);
    formData.set('slug', slug);
    formData.set('category', category);
    formData.set('tags', tags);
    formData.set('author', author);
    formData.set('readingTime', String(readingTime));
    formData.set('excerpt', excerpt);
    formData.set('image', imageUrl);
    formData.set('description', description);
    formData.set('metaTitle', metaTitle);
    formData.set('metaDescription', metaDescription);
    formData.set('keywords', keywordsList.join(', '));

    startSaveTransition(async () => {
      try {
        await saveBlogPostAction(formData);
        await alertSuccess(isNew ? 'New blog post created!' : 'Blog post updated successfully!');
        router.push('/admin/dashboard/content/blog');
        router.refresh();
      } catch (err) {
        await alertError('Failed to save post', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <div className="mx-auto max-w-7xl pb-16">
      {/* ---------------- Top Bar ---------------- */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-navy/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/admin/dashboard/content/blog"
            className="mb-2 inline-flex items-center text-[13px] font-medium text-navy/70 hover:text-navy"
          >
            ← Back to Blog
          </Link>
          <h1 className="font-serif text-[28px] text-navy">
            {isNew ? 'New Blog Post' : 'Edit Post'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[13px] font-medium text-muted">
            {isNew ? 'Create new entry' : 'Update existing entry'}
          </span>
        </div>
      </div>

      {/* ---------------- Main Layout (2 Columns) ---------------- */}
      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Left Main Editor Column */}
        <div className="space-y-6 rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-card sm:p-8">
          {/* Title & Slug */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title..."
                className={`${inputClass} font-medium`}
              />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  slugManuallyEdited.current = true;
                  setSlug(e.target.value);
                }}
                placeholder="post-url-slug"
                className={`${inputClass} font-mono text-[13px]`}
              />
            </div>
          </div>

          {/* Category & Tags */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputClass}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Tags (comma-separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Aesthetics, Skin Care, Anti-Aging..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Author & Reading Time */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Reading Time (minutes)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={readingTime}
                onChange={(e) => setReadingTime(parseInt(e.target.value, 10) || 1)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Excerpt with live counter */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[13px] font-semibold text-navy">Excerpt</label>
              <span className="text-[12px] font-mono text-muted">
                {excerpt.length}/160
              </span>
            </div>
            <textarea
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary of the blog post for listings and social sharing..."
              className={inputClass}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className={labelClass}>Cover Image</label>
            <div className="space-y-2.5">
              <CloudinaryUpload
                folder="blog"
                currentUrl={imageUrl}
                onUploaded={setImageUrl}
                label="Upload Cover Image from local storage (compresses to WebP)"
              />
              <button
                type="button"
                onClick={() => setShowMediaModal(true)}
                className="w-full rounded-xl border border-navy/15 bg-white py-2 text-[13px] font-medium text-navy transition-colors hover:bg-cream/40 flex items-center justify-center gap-2"
              >
                <span>📂</span>
                <span>Pick from media library</span>
              </button>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... or /images/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Post Description / Content */}
          <div>
            <label className={labelClass}>
              Post Description
            </label>
            <p className="mb-2 text-[12px] text-muted">
              Write your blog post article in normal text. Paragraphs and line breaks will be preserved automatically.
            </p>
            <textarea
              rows={16}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your blog post content and description here..."
              className={`${inputClass} mt-1 font-sans text-[14.5px] leading-[1.8] text-navy`}
            />
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          {/* SEO Card */}
          <div className="rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-card space-y-5">
            <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
              <span className="text-lg">🌐</span>
              <h3 className="font-serif text-[16px] text-navy">SEO</h3>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-medium text-navy">Meta Title</label>
                <span className="text-[12px] font-mono text-muted">
                  {metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Meta title..."
                className={inputClass}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[13px] font-medium text-navy">Meta Description</label>
                <span className="text-[12px] font-mono text-muted">
                  {metaDescription.length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta description..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-navy">Keywords</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newKeywordInput}
                  onChange={(e) => setNewKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder="Type tag + Enter..."
                  className={`${inputClass} flex-1`}
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-lg font-bold text-white transition-colors hover:bg-navy-deep"
                  title="Add Keyword"
                >
                  +
                </button>
              </div>

              {/* Keyword Badges */}
              {keywordsList.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {keywordsList.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream/70 px-3 py-1 text-[12px] font-medium text-navy border border-navy/10"
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        className="text-navy/50 hover:text-rose-deep font-bold"
                        title="Remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* PUBLISH DATE Card */}
          <div className="rounded-2xl border border-navy/[0.08] bg-white p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2 border-b border-navy/10 pb-3">
              <span className="text-lg">📅</span>
              <h3 className="font-serif text-[16px] text-navy">PUBLISH DATE</h3>
            </div>
            <div className="relative">
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className={`${inputClass} pr-10`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- Bottom Action Bar ---------------- */}
      <div className="mt-8 flex items-center justify-end gap-4 border-t border-navy/10 pt-6">
        {!isNew && post?.id && (
          <DeleteButton
            id={post.id}
            label="Delete Post"
            itemLabel={post.title}
            action={async (formData) => {
              await deleteBlogPostAction(formData);
              router.push('/admin/dashboard/content/blog');
              router.refresh();
            }}
            className={dangerBtn}
          />
        )}
        <Link
          href="/admin/dashboard/content/blog"
          className="rounded-xl border border-navy/15 bg-white px-6 py-2.5 text-[14px] font-medium text-navy transition-colors hover:bg-cream/40"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center rounded-xl bg-navy px-8 py-3 text-[15px] font-medium text-white shadow-sm transition-all hover:bg-navy-deep disabled:opacity-60"
        >
          {saving ? 'Saving...' : isNew ? 'Publish New Post' : 'Save Changes'}
        </button>
      </div>

      {/* ---------------- Media Library Modal ---------------- */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-navy/10">
            <div className="mb-4 flex items-center justify-between border-b border-navy/10 pb-3">
              <h3 className="font-serif text-[18px] text-navy">Select from Media Library</h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="text-muted hover:text-navy text-xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
              {PRESET_IMAGES.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setImageUrl(src);
                    setShowMediaModal(false);
                  }}
                  className={`group relative h-24 overflow-hidden rounded-xl border transition-all ${
                    imageUrl === src ? 'border-navy ring-2 ring-navy' : 'border-navy/10 hover:border-navy/40'
                  }`}
                >
                  <Image src={src} alt={src} fill className="object-cover" sizes="160px" />
                </button>
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="rounded-xl bg-navy px-5 py-2 text-[13px] font-medium text-white hover:bg-navy-deep"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
