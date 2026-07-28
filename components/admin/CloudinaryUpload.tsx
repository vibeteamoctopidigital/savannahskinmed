'use client';

import { useRef, useState } from 'react';

type CloudinaryUploadProps = {
  folder: string;
  currentUrl?: string;
  onUploaded: (url: string) => void;
  label?: string;
  className?: string;
  accept?: string;
};

export default function CloudinaryUpload({
  folder,
  currentUrl,
  onUploaded,
  label = 'Upload Image',
  className = '',
  accept = 'image/*',
}: CloudinaryUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || '');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');

      const { url } = await res.json();
      setPreview(url);
      onUploaded(url);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {label && <label className="mb-1.5 block text-[13px] font-medium text-navy">{label}</label>}
      <div className="flex items-start gap-4">
        <div
          className="flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-navy/20 bg-cream/40 transition-colors hover:border-navy/40"
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <span className="px-2 text-center text-[11px] text-muted">Click to upload</span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="self-start rounded-lg border border-navy/20 px-4 py-2 text-[12px] font-medium text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Choose File'}
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => {
                setPreview('');
                onUploaded('');
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="self-start text-[12px] font-medium text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
          {uploading && (
            <div className="h-1 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-navy/40" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
