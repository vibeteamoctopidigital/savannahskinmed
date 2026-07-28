'use client';

import { useState } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { cardClass } from '@/lib/adminUi';

type BrandingProps = {
  logoUrl: string;
  faviconUrl: string;
};

export default function SiteBrandingUpload({ logoUrl, faviconUrl }: BrandingProps) {
  const [logo, setLogo] = useState(logoUrl);
  const [favicon, setFavicon] = useState(faviconUrl);

  return (
    <section className={cardClass}>
      <h2 className="mb-2 font-serif text-[19px] text-navy">Branding</h2>
      <p className="mb-5 text-[13px] text-muted">
        Upload your site logo and favicon, then click <strong>Save Settings</strong> at the bottom
        of this page to publish them.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <CloudinaryUpload
          folder="branding"
          currentUrl={logo}
          onUploaded={setLogo}
          label="Site Logo"
        />
        <input type="hidden" name="logoUrl" value={logo} form="settings-save" />

        <CloudinaryUpload
          folder="branding"
          currentUrl={favicon}
          onUploaded={setFavicon}
          label="Favicon"
          accept="image/*,.ico,.png"
        />
        <input type="hidden" name="faviconUrl" value={favicon} form="settings-save" />
      </div>
    </section>
  );
}
