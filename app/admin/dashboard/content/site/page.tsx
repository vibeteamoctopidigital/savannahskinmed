import { prisma } from '@/lib/prisma';
import AddInlineForm from '@/components/admin/AddInlineForm';
import DeleteButton from '@/components/admin/DeleteButton';
import PendingSubmitButton from '@/components/admin/PendingSubmitButton';
import SaveButton from '@/components/admin/SaveButton';
import { cardClass, dangerBtn, inputClass, primaryBtn, smallBtn } from '@/lib/adminUi';
import {
  createLocationAction,
  createLocationHourAction,
  deleteLocationAction,
  deleteLocationHourAction,
  saveAllAction,
} from './actions';

export const dynamic = 'force-dynamic';

const SAVE_FORM_ID = 'site-save';

export default async function SiteContentPage() {
  let locations;
  try {
    locations = await prisma.location.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { hours: { orderBy: { sortOrder: 'asc' } } },
    });
  } catch {
    return (
      <div className={cardClass}>
        <h1 className="mb-2 font-serif text-[24px] text-navy">Locations &amp; Hours</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Locations &amp; Hours</h1>
        <p className="text-[13px] text-muted">
          Brand info, social links, favicon and tracking codes live under{' '}
          <span className="font-medium text-navy">Settings</span>. Edit anything below, then save
          once at the bottom.
        </p>
      </div>

      {/* Locations */}
      <section className={cardClass}>
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
                  <DeleteButton
                    action={deleteLocationAction}
                    id={location.id}
                    itemLabel={`location "${location.city}"`}
                    label="Delete Location"
                    className={dangerBtn}
                  />
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
                      <DeleteButton
                        action={deleteLocationHourAction}
                        id={h.id}
                        itemLabel="hours row"
                        className={dangerBtn}
                      />
                    </div>
                  ))}
                </div>

                <AddInlineForm
                  action={createLocationHourAction}
                  successMessage="Hours row added!"
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
                  <PendingSubmitButton pendingLabel="Adding…" className={smallBtn}>
                    Add Hours Row
                  </PendingSubmitButton>
                </AddInlineForm>
              </div>
            </div>
          ))}
        </div>

        <AddInlineForm
          action={createLocationAction}
          successMessage="Location added!"
          className="mt-6 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-2"
        >
          <Field label="City" name="city" noForm />
          <Field label="Badge (optional)" name="badge" noForm />
          <Field label="Address lines (one per line)" name="addressLines" as="textarea" className="sm:col-span-2" noForm />
          <Field label="Order" name="sortOrder" type="number" defaultValue="1" noForm />
          <div className="flex items-end">
            <PendingSubmitButton pendingLabel="Adding…" className={smallBtn}>
              Add Location
            </PendingSubmitButton>
          </div>
        </AddInlineForm>
      </section>

      <form
        id={SAVE_FORM_ID}
        className="sticky bottom-4 z-20 flex justify-end rounded-2xl border border-navy/10 bg-white/95 p-4 shadow-card backdrop-blur-md"
      >
        <SaveButton
          formId={SAVE_FORM_ID}
          action={saveAllAction}
          successMessage="Changes saved!"
          className={primaryBtn}
        >
          Save All Changes
        </SaveButton>
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
