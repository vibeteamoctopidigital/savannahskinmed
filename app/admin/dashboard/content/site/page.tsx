import { prisma } from '@/lib/prisma';
import {
  createFooterLinkAction,
  createLocationAction,
  createLocationHourAction,
  deleteFooterLinkAction,
  deleteLocationAction,
  deleteLocationHourAction,
  saveAllAction,
} from './actions';

export const dynamic = 'force-dynamic';

const SAVE_FORM_ID = 'site-save';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';
const smallBtn =
  'rounded-lg border border-navy/20 px-3 py-1.5 text-[12px] font-medium text-navy hover:bg-navy hover:text-white';
const dangerBtn = 'text-[12px] font-medium text-red-600 hover:underline';

export default async function SiteContentPage() {
  let locations, footerLinks;
  try {
    [locations, footerLinks] = await Promise.all([
      prisma.location.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { hours: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.footerNavLink.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Locations &amp; Footer Links</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  const quickLinks = footerLinks.filter((l) => l.group === 'QUICK_LINK');
  const footerServiceLinks = footerLinks.filter((l) => l.group === 'FOOTER_SERVICE');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Locations &amp; Footer Links</h1>
        <p className="text-[13px] text-muted">
          Brand info, social links, favicon and tracking codes now live under{' '}
          <span className="font-medium text-navy">Settings</span>. Edit anything below, then save
          once at the bottom.
        </p>
      </div>

      {/* Locations */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Locations &amp; Hours</h2>
        <div className="space-y-8">
          {locations.map((location) => (
            <div key={location.id} className="rounded-xl border border-navy/10 p-5">
              <input type="hidden" name="locationIds" value={location.id} form={SAVE_FORM_ID} />
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="City" name={`loc-city-${location.id}`} defaultValue={location.city} />
                <Field label="Badge (optional)" name={`loc-badge-${location.id}`} defaultValue={location.badge ?? ''} />
                <Field
                  label="Address lines (one per line)"
                  name={`loc-address-${location.id}`}
                  as="textarea"
                  defaultValue={(location.addressLines as string[]).join('\n')}
                  className="sm:col-span-2"
                />
                <Field
                  label="Order"
                  name={`loc-order-${location.id}`}
                  type="number"
                  defaultValue={String(location.sortOrder + 1)}
                />
                <div className="flex items-end">
                  <form action={deleteLocationAction} className="inline">
                    <input type="hidden" name="id" value={location.id} />
                    <button type="submit" className={dangerBtn}>
                      Delete Location
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-5 border-t border-navy/10 pt-4">
                <p className="mb-3 text-[13px] font-semibold text-navy">Hours</p>
                <div className="space-y-3">
                  {location.hours.map((h) => (
                    <div key={h.id} className="grid items-end gap-2 sm:grid-cols-[auto_1fr_1fr_auto_auto]">
                      <input type="hidden" name="hourIds" value={h.id} form={SAVE_FORM_ID} />
                      <div>
                        <label className="mb-1 block text-[12px] text-muted">Kind</label>
                        <select name={`hour-kind-${h.id}`} defaultValue={h.kind} className={inputClass} form={SAVE_FORM_ID}>
                          <option value="FULL">Full</option>
                          <option value="SHORT">Short</option>
                        </select>
                      </div>
                      <Field label="Days" name={`hour-days-${h.id}`} defaultValue={h.days} />
                      <Field label="Time" name={`hour-time-${h.id}`} defaultValue={h.time} />
                      <Field label="Order" name={`hour-order-${h.id}`} type="number" defaultValue={String(h.sortOrder + 1)} />
                      <form action={deleteLocationHourAction} className="inline">
                        <input type="hidden" name="id" value={h.id} />
                        <button type="submit" className={dangerBtn}>
                          Delete
                        </button>
                      </form>
                    </div>
                  ))}
                </div>

                <form
                  action={createLocationHourAction}
                  className="mt-3 grid items-end gap-2 border-t border-navy/10 pt-3 sm:grid-cols-[auto_1fr_1fr_auto_auto]"
                >
                  <input type="hidden" name="locationId" value={location.id} />
                  <div>
                    <label className="mb-1 block text-[12px] text-muted">Kind</label>
                    <select name="kind" defaultValue="FULL" className={inputClass}>
                      <option value="FULL">Full</option>
                      <option value="SHORT">Short</option>
                    </select>
                  </div>
                  <Field label="Days" name="days" placeholder="Mon to Thu:" noForm />
                  <Field label="Time" name="time" placeholder="9:00 AM - 5:00 PM" noForm />
                  <Field label="Order" name="sortOrder" type="number" defaultValue="1" noForm />
                  <button type="submit" className={smallBtn}>
                    Add Hours Row
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <form action={createLocationAction} className="mt-6 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-2">
          <Field label="City" name="city" noForm />
          <Field label="Badge (optional)" name="badge" noForm />
          <Field label="Address lines (one per line)" name="addressLines" as="textarea" className="sm:col-span-2" noForm />
          <Field label="Order" name="sortOrder" type="number" defaultValue="1" noForm />
          <div className="flex items-end">
            <button type="submit" className={smallBtn}>
              Add Location
            </button>
          </div>
        </form>
      </section>

      {/* Footer links */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Footer &ldquo;Quick Links&rdquo;</h2>
        <FooterLinkGroupFields links={quickLinks} group="QUICK_LINK" />
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Footer &ldquo;Services&rdquo;</h2>
        <FooterLinkGroupFields links={footerServiceLinks} group="FOOTER_SERVICE" />
      </section>

      <form id={SAVE_FORM_ID} action={saveAllAction}>
        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
}

function FooterLinkGroupFields({
  links,
  group,
}: {
  links: { id: string; label: string; href: string; sortOrder: number }[];
  group: 'QUICK_LINK' | 'FOOTER_SERVICE';
}) {
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <div key={link.id} className="grid items-end gap-2 sm:grid-cols-[2fr_2fr_auto_auto]">
          <input type="hidden" name="linkIds" value={link.id} form={SAVE_FORM_ID} />
          <Field label="Label" name={`link-label-${link.id}`} defaultValue={link.label} />
          <Field label="Href" name={`link-href-${link.id}`} defaultValue={link.href} />
          <Field label="Order" name={`link-order-${link.id}`} type="number" defaultValue={String(link.sortOrder + 1)} />
          <form action={deleteFooterLinkAction} className="inline">
            <input type="hidden" name="id" value={link.id} />
            <button type="submit" className={dangerBtn}>
              Delete
            </button>
          </form>
        </div>
      ))}

      <form action={createFooterLinkAction} className="grid items-end gap-2 border-t border-navy/10 pt-3 sm:grid-cols-[2fr_2fr_auto_auto]">
        <input type="hidden" name="group" value={group} />
        <Field label="Label" name="label" noForm />
        <Field label="Href" name="href" noForm />
        <Field label="Order" name="sortOrder" type="number" defaultValue="1" noForm />
        <button type="submit" className={smallBtn}>
          Add
        </button>
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
  className = '',
  placeholder,
  noForm = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  as?: 'textarea';
  className?: string;
  placeholder?: string;
  /** Set for fields inside their own standalone form (Add sections) so they
   * don't also get associated with the shared bulk-save form. */
  noForm?: boolean;
}) {
  const formProp = noForm ? undefined : SAVE_FORM_ID;
  return (
    <div className={className}>
      <label className="mb-1 block text-[12px] text-muted">{label}</label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className={inputClass}
          form={formProp}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClass}
          form={formProp}
        />
      )}
    </div>
  );
}
