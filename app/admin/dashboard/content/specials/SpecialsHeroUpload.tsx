'use client';

import { useRef, useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { saveHeroAction } from '@/app/admin/dashboard/content/specials/actions';

type HeroSettings = {
  heroTitle: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  offersHeading: string;
} | null;

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';

export default function SpecialsHeroUpload({ settings }: { settings: HeroSettings }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [heroImage, setHeroImage] = useState(settings?.heroImage || '');
  const [saving, startSaveTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startSaveTransition(async () => {
      await saveHeroAction(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  };

  return (
    <form ref={formRef} className="space-y-4">
      <input type="hidden" name="heroImage" value={heroImage} />

      <CloudinaryUpload
        folder="specials/hero"
        currentUrl={heroImage}
        onUploaded={setHeroImage}
        label="Hero Image"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] text-muted">Hero Title</label>
          <input name="heroTitle" defaultValue={settings?.heroTitle} className={inputClass} />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-muted">Offers Section Heading</label>
          <input name="offersHeading" defaultValue={settings?.offersHeading} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[12px] text-muted">Hero Intro</label>
          <textarea name="heroIntro" defaultValue={settings?.heroIntro} rows={3} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[12px] text-muted">Hero Image Alt Text</label>
          <input name="heroImageAlt" defaultValue={settings?.heroImageAlt} className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-navy/10 pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-navy px-5 py-2.5 text-[12px] font-semibold text-white transition-colors hover:bg-navy-deep disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Hero'}
        </button>
        {saved && (
          <span className="text-[12px] font-medium text-green-600">Saved!</span>
        )}
      </div>
    </form>
  );
}
