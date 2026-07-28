import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

export default function InjectablesTreatments() {
  return (
    <section className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-10 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-20">
            <div className="text-center">
              <div className="mx-auto mb-8 inline-flex rounded-full bg-cream px-6 py-2">
                <span className="eyebrow text-navy">Treatments</span>
              </div>
              <h2 className="display-3 mb-4 text-navy">Neurotoxins And Filler</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8]">
                Enhance your natural beauty with expert injectables. Choose a treatment to refine, restore, and rejuvenate your overall look.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-10 text-[15.5px] leading-[1.8] text-ink">
              {/* Dermal Filler Section */}
              <div>
                <h3 className="font-sans text-[18px] font-bold text-navy">Dermal Filler</h3>
                <p className="mt-3 text-muted">
                  Add volume, smooth deep creases, and enhance facial contours with our selection of high-quality dermal fillers. Results are immediate and can last from six months to over a year, depending on the product used and the treatment area.
                </p>
                <p className="mt-4 font-semibold text-navy">Dermal filler can be used to provide:</p>
                <ul className="mt-3 flex flex-col gap-2 pl-2">
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    <strong className="text-navy">Cheek contouring:</strong> Create definition, add youthful volume, or gently lift the lower face by restoring lost structure in the mid-face.
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    <strong className="text-navy">Jawline sculpting:</strong> Define the jawline, minimize jowls, and create a more structured, youthful profile.
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    <strong className="text-navy">Nose contouring:</strong> A non-surgical option to smooth bumps, lift the tip, or refine the shape of the nose with minimal downtime.
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    <strong className="text-navy">Lip enhancement:</strong> Restore lost volume, smooth vertical lip lines, or simply add subtle, hydrating plumpness tailored to your facial proportions.
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    <strong className="text-navy">Mid-face enhancement:</strong> Soften the nasolabial folds (smile lines) and marionette lines for a rejuvenated, rested appearance.
                  </li>
                </ul>
                <p className="mt-5 text-[12.5px] leading-[1.6] text-[#8e95a3]">
                  Dermal fillers should only be administered by experienced, licensed medical professionals who possess an in-depth understanding of facial anatomy.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-haze" />

              {/* Neurotoxins Section */}
              <div>
                <h3 className="font-sans text-[18px] font-bold text-navy">Neurotoxins</h3>
                <p className="mt-3 text-muted">
                  Soften dynamic wrinkles and prevent new lines from forming with our precise, expert application of neuromodulators (like Botox, Dysport, or Xeomin). Results appear within days and typically last 3 to 4 months.
                </p>
                <p className="mt-4 font-semibold text-navy">Neurotoxins target concerns such as:</p>
                <ul className="mt-3 flex flex-col gap-2 pl-2 text-muted">
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Frown lines (the 11s) and forehead lines
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Crows feet lines
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Lip flip or gummy smile
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Masseter muscle (for jaw clenching or slimming)
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Platysmal bands in the neck
                  </li>
                  <li className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                    Hyperhidrosis (excess sweating)
                  </li>
                </ul>
                <p className="mt-5 text-[12.5px] leading-[1.6] text-[#8e95a3]">
                  As with any medical procedure, there are potential risks and side effects. A thorough consultation is essential before treatment.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/laser-hair-removal" className="font-medium hover:text-rose transition-colors">
                ← LASER HAIR REMOVAL
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy px-8 py-3.5 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/laser-skin-rejuvenation" className="font-medium hover:text-rose transition-colors">
                LASER SKIN REJUVENATION →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
