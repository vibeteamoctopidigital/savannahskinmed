import Link from 'next/link';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import Reveal from '@/components/ui/Reveal';

const dermalFillerUses = [
  {
    label: 'Cheek contouring',
    description: 'Create defined, sculpted cheeks with expertly placed filler, giving your face a lifted and youthful appearance',
  },
  {
    label: 'Jaw contouring',
    description: 'Achieve a strong, contoured jawline with filler injections, perfect for enhancing facial structure and definition.',
  },
  {
    label: 'Nose contouring',
    description: 'A non-surgical solution to reshape and refine the nose, offering precise corrections to nasal symmetry and contour.',
  },
  {
    label: 'Lip enhancement',
    description: 'Enhance the fullness and shape of your lips with natural-looking results, achieving the perfect balance of volume and definition.',
  },
  {
    label: 'Marionette line reduction',
    description: 'Add fullness back to the nasolabial folds and reduce the appearance of deep lines.',
  },
];

const neurotoxinUses = [
  'Soften smile lines and laugh lines',
  "Reuce crow's feet",
  'Target "11" lines"',
  'Minimize lines on the forehead',
  'Offer a more pronounced upper lip (often called "lip flip")',
  'Reduce perspiration in targeted areas',
  'Manage migraines',
];

export default function NeurotoxinsAndFillerOfferings() {
  return (
    <section id="offerings" className="section bg-mist pt-8 lg:pt-16">
      <Reveal>
        <div className="mx-auto container rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
          <div className="text-center">
            <h2 className="display-3 mb-4 text-navy font-semibold text-[40px]">Neurotoxins And Filler</h2>
            <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
              Enhance your natural beauty with precision and care. Ensure a customized, natural-looking result every visit.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-[720px] items-center justify-center rounded-full bg-[#f1f1ee] px-8 py-4">
              <span className="font-sans text-[15px] font-bold tracking-widest text-navy uppercase">
                Treatments
              </span>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[680px] text-left">
            {/* Dermal Filler */}
            <div>
              <h3 className="font-serif text-[24px] text-navy">Dermal Filler</h3>
              <p className="mt-3 text-[15.5px] leading-[1.8] text-muted">
                Add volume, reduce the appearance of wrinkles, fine lines, and boost sagging skin. Ideal for adding cheek structure, enhancing lips, or creating volume in areas that need a subtle lift to restore a youthful, plump look to the skin.
              </p>
              <p className="mt-5 text-[15.5px] font-bold text-navy">
                Dermal filler can be used to provide:
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {dermalFillerUses.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-[15px] leading-none text-[#8a8f99]" aria-hidden>
                      &rarr;
                    </span>
                    <p className="text-[15.5px] leading-[1.8] text-muted">
                      <span className="font-bold text-navy">{item.label}:</span> {item.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13.5px] leading-[1.7] text-[#a3a8b3]">
                Dermal filler is sold by the vial. Your specialist can help determine the appropriate filler brand and vial amount to achieve your desired look.
              </p>
            </div>

            {/* Neurotoxins */}
            <div className="mt-12">
              <h3 className="font-serif text-[24px] text-navy">Neurotoxins</h3>
              <p className="mt-3 text-[15.5px] leading-[1.8] text-muted">
                We offer botulinum toxin type A injections. These drugs work by temporarily paralyzing or weakening targeted muscles, which can reduce or eliminate wrinkles, lines, and other cosmetic concerns.
              </p>
              <p className="mt-5 text-[15.5px] font-bold text-navy">
                Neruotoxin injections are used to:
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {neurotoxinUses.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-[15px] leading-none text-[#8a8f99]" aria-hidden>
                      &rarr;
                    </span>
                    <p className="text-[15.5px] leading-[1.8] text-muted">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13.5px] leading-[1.7] text-[#a3a8b3]">
                Neurotoxins are priced by the unit. Your specialist can help determine the appropriate number of units for you.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
            <Link
              href="/laser-hair-removal"
              className="inline-flex items-center gap-2 font-medium text-[#8a8f99] transition-colors hover:text-rose"
            >
              <span aria-hidden>&larr;</span>
              LASER HAIR REMOVAL
            </Link>
            <BookAppointmentButton className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
              BOOK APPOINTMENT
              <span aria-hidden>&rarr;</span>
            </BookAppointmentButton>
            <Link
              href="/laser-skin-rejuvenation"
              className="inline-flex items-center gap-2 font-medium text-[#8a8f99] transition-colors hover:text-rose"
            >
              LASER SKIN REJUVENATION
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}