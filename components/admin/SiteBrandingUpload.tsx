'use client';

import { useState } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

type BrandingProps = {
  logoUrl: string;
  faviconUrl: string;
};

export default function SiteBrandingUpload({ logoUrl, faviconUrl }: BrandingProps) {
  const [logo, setLogo] = useState(logoUrl);
  const [favicon, setFavicon] = useState(faviconUrl);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
      <h2 className="mb-2 font-serif text-[19px] text-navy">Branding</h2>
      <p className="mb-5 text-[13px] text-muted">
        Upload your site logo and favicon. These appear in the header and browser tab.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <CloudinaryUpload
          folder="branding"
          currentUrl={logo}
          onUploaded={setLogo}
          label="Site Logo"
        />
        <input type="hidden" name="logoUrl" value={logo} />

        <CloudinaryUpload
          folder="branding"
          currentUrl={favicon}
          onUploaded={setFavicon}
          label="Favicon"
          accept="image/*,.ico,.png"
        />
        <input type="hidden" name="faviconUrl" value={favicon} />
      </div>
    </section>
  );
}
