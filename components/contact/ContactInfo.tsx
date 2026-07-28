import Reveal from '@/components/ui/Reveal';
import { locations, site } from '@/lib/site';

const MAP_SRC =
  'https://www.google.com/maps?q=Savannah+Age+Management+Medicine,+200+Blue+Moon+Xing+Suite+102,+Pooler,+GA+31322&z=14&output=embed';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[92px_1fr] gap-x-4 gap-y-1">
      <p className="font-sans text-[14px] font-semibold text-navy">{label}</p>
      <div className="text-[14px] text-navy">{children}</div>
    </div>
  );
}

export default function ContactInfo() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-[80px]">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* ---------------- Details ---------------- */}
          <Reveal>
            <h2 className="display-3">Contact Information</h2>

            <div className="mt-9 space-y-6">
              <Row label="Phone:">
                <a href={site.phoneHref} className="hover:text-rose-deep">
                  {site.phone}
                </a>
              </Row>

              <Row label="Email:">
                <a href={site.emailHref} className="hover:text-rose-deep">
                  {site.email}
                </a>
              </Row>

              <Row label="Locations:">
                <div className="space-y-7">
                  {locations.map((location) => (
                    <div key={location.city}>
                      <p className="font-sans text-[14px] font-semibold text-navy">
                        {location.city}
                      </p>
                      {location.address.map((line) => (
                        <p key={line}>{line}</p>
                      ))}

                      <p className="mt-4 font-sans text-[14px] font-semibold text-navy">
                        Office Hours
                      </p>
                      <dl className="mt-1.5 grid grid-cols-[minmax(78px,auto)_1fr] gap-x-6 gap-y-1.5">
                        {location.hours.map((entry) => (
                          <div key={entry.days} className="contents">
                            <dt>{entry.days}</dt>
                            <dd className="font-sans font-semibold text-navy">{entry.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
                </div>
              </Row>
            </div>
          </Reveal>

          {/* ---------------- Map ---------------- */}
          <Reveal delay={120} className="overflow-hidden rounded-sm border border-navy/10">
            <iframe
              src={MAP_SRC}
              title="Map showing Savannah Age Management Medicine in Pooler, Georgia"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[420px] w-full sm:h-[520px] lg:aspect-square lg:h-auto"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
