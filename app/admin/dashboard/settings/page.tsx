import AdminAccountForm from '@/components/admin/AdminAccountForm';
import SiteBrandingUpload from '@/components/admin/SiteBrandingUpload';
import { prisma } from '@/lib/prisma';
import { updateSettingsAction } from './actions';

export const dynamic = 'force-dynamic';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3.5 py-2.5 text-[14px] text-navy outline-none focus:border-navy';

export default async function AdminSettingsPage() {
  let settings, socials, adminUser;
  try {
    [settings, socials, adminUser] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { id: 'main' } }),
      prisma.socialLink.findMany(),
      prisma.adminUser.findFirst(),
    ]);
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Settings</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage settings.
        </p>
      </div>
    );
  }

  const socialByIcon = Object.fromEntries(socials.map((s) => [s.icon, s.href]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Settings</h1>
        <p className="text-[13px] text-muted">Manage your site configuration</p>
      </div>

      {/* Branding — Logo & Favicon upload at the top */}
      <SiteBrandingUpload
        logoUrl={settings?.logoUrl || ''}
        faviconUrl={settings?.faviconUrl || ''}
      />

      <AdminAccountForm currentEmail={adminUser?.email ?? ''} />

      <form action={updateSettingsAction} className="space-y-8">
        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="mb-5 font-serif text-[19px] text-navy">General Settings</h2>
          <div className="grid gap-4">
            <Field label="Site Name" name="name" defaultValue={settings?.name} />
            <Field
              label="Site Description"
              name="description"
              as="textarea"
              defaultValue={settings?.description}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contact Email" name="email" type="email" defaultValue={settings?.email} />
              <Field label="Phone Number" name="phone" defaultValue={settings?.phone} />
            </div>
            <Field label="Address" name="address" as="textarea" defaultValue={settings?.address} />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="mb-5 font-serif text-[19px] text-navy">Social Links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Twitter" name="twitter" placeholder="https://twitter.com/…" defaultValue={socialByIcon.twitter} />
            <Field label="LinkedIn" name="linkedin" placeholder="https://linkedin.com/…" defaultValue={socialByIcon.linkedin} />
            <Field label="GitHub" name="github" placeholder="https://github.com/…" defaultValue={socialByIcon.github} />
            <Field label="Facebook" name="facebook" placeholder="https://facebook.com/…" defaultValue={socialByIcon.facebook} />
            <Field label="Instagram" name="instagram" placeholder="https://instagram.com/…" defaultValue={socialByIcon.instagram} />
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-serif text-[19px] text-navy">Analytics</h2>
          <p className="mb-5 text-[13px] text-muted">
            Add your tracking IDs for analytics and conversion tracking
          </p>
          <div className="space-y-4">
            <div>
              <Field label="Google Analytics ID" name="googleAnalyticsId" placeholder="G-XXXXXXXXXX" defaultValue={settings?.googleAnalyticsId} />
              <p className="mt-1 text-[12px] text-muted">Your Google Analytics Measurement ID (GA4)</p>
            </div>
            <div>
              <Field label="Meta Pixel ID" name="metaPixelId" placeholder="1234567890" defaultValue={settings?.metaPixelId} />
              <p className="mt-1 text-[12px] text-muted">
                Your Meta Pixel ID for Facebook/Instagram conversion tracking
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-serif text-[19px] text-navy">Tracking Codes</h2>
          <p className="mb-5 text-[13px] text-muted">
            Add custom tracking scripts. Header code is injected in &lt;head&gt; and footer code
            before &lt;/body&gt;. Supports Google Tag Manager, Meta Pixel, Hotjar, etc.
          </p>
          <div className="space-y-5">
            <div>
              <Field
                label="Header Tracking Code"
                name="headerTrackingCode"
                as="textarea"
                mono
                rows={5}
                defaultValue={settings?.headerTrackingCode}
              />
              <p className="mt-1 text-[12px] text-muted">Injected inside &lt;head&gt; tag on every page</p>
            </div>
            <div>
              <Field
                label="Footer Tracking Code"
                name="footerTrackingCode"
                as="textarea"
                mono
                rows={5}
                defaultValue={settings?.footerTrackingCode}
              />
              <p className="mt-1 text-[12px] text-muted">Injected before &lt;/body&gt; tag on every page</p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Save Settings
        </button>

        <p className="rounded-lg border border-navy/10 bg-cream/60 p-4 text-[13px] text-muted">
          Changes to these settings will be reflected on your website. Some changes may require a
          page refresh to take effect.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  as,
  mono = false,
  rows = 3,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  type?: string;
  as?: 'textarea';
  mono?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      {label && <label className="mb-1.5 block text-[13px] font-medium text-navy">{label}</label>}
      {as === 'textarea' ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder}
          rows={rows}
          className={`${inputClass} ${mono ? 'font-mono text-[12px]' : ''}`}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ''}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
