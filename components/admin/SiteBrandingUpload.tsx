'use client';

import { useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { updateFaviconAction, updateLogoAction } from '@/app/admin/dashboard/settings/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, primaryBtn } from '@/lib/adminUi';

type BrandingProps = {
  logoUrl: string;
  faviconUrl: string;
};

export default function SiteBrandingUpload({ logoUrl, faviconUrl }: BrandingProps) {
  const [logo, setLogo] = useState(logoUrl);
  const [favicon, setFavicon] = useState(faviconUrl);
  const [savingLogo, startSaveLogo] = useTransition();
  const [savingFavicon, startSaveFavicon] = useTransition();

  const saveLogo = () => {
    startSaveLogo(async () => {
      try {
        const formData = new FormData();
        formData.set('logoUrl', logo);
        await updateLogoAction(formData);
        await alertSuccess('Logo saved!');
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  const saveFavicon = () => {
    startSaveFavicon(async () => {
      try {
        const formData = new FormData();
        formData.set('faviconUrl', favicon);
        await updateFaviconAction(formData);
        await alertSuccess('Favicon saved!');
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <section className={cardClass}>
      <h2 className="mb-2 font-serif text-[19px] text-navy">Branding</h2>
      <p className="mb-5 text-[13px] text-muted">
        Upload your site logo and favicon. These appear in the header and browser tab.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <CloudinaryUpload folder="branding" currentUrl={logo} onUploaded={setLogo} label="Site Logo" />
          <button
            type="button"
            onClick={saveLogo}
            disabled={savingLogo}
            className={`mt-4 ${primaryBtn}`}
          >
            {savingLogo ? 'Saving…' : 'Save Logo'}
          </button>
        </div>

        <div>
          <CloudinaryUpload
            folder="branding"
            currentUrl={favicon}
            onUploaded={setFavicon}
            label="Favicon"
            accept="image/*,.ico,.png"
          />
          <button
            type="button"
            onClick={saveFavicon}
            disabled={savingFavicon}
            className={`mt-4 ${primaryBtn}`}
          >
            {savingFavicon ? 'Saving…' : 'Save Favicon'}
          </button>
        </div>
      </div>
    </section>
  );
}
