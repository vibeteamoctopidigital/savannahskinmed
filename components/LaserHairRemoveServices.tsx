import Link from 'next/link';



import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import Reveal from '@/components/ui/Reveal';
const treatmentAreas = [
  ['Full Back', 'Half Back'],
  ['Full Bikini', 'Forearms'],
  ['Full Arms', 'Full Face'],
  ['Full Face And Neck', 'Half Leg'],
  ['Full Leg', 'Underarms'],
  ['Buttocks', 'Lip'],
  ['Chin', 'Lip And Chin'],
  ['Bikini', 'Neck'],
  ['Abdomen', ''],
];

export default function LaserHairRemovalOfferings() {
  return (
    <section id="offerings" className="section bg-mist pt-8 lg:pt-16">
<div className="shell relative z-20 ">

        <Reveal>
          <div className="mx-auto min-w-full rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="mb-5 font-serif text-[36px] sm:text-[48px] leading-[1.1] text-[#051E5C]">Laser Hair Removal Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
                We provide an array of laser hair removal services for various parts of the body, committed to quality, precision, and safety:
              </p>
              <div className="mx-auto mt-8 flex w-full max-w-[720px] items-center justify-center rounded-full bg-[#f1f1ee] px-8 py-4">
                <span className="font-sans text-[15px] font-bold tracking-widest text-navy uppercase">
                  Treatment Areas
                </span>
              </div>
            </div>

            <div className="mx-auto mt-12 grid max-w-[600px] grid-cols-1 gap-x-16 gap-y-5 text-center sm:grid-cols-2">
              {treatmentAreas.flat().filter(Boolean).map((area, i) => (
                <span key={i} className="font-sans text-[16px] font-bold text-navy">
                  {area}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link
                href="/medical-grade-facials"
                className="inline-flex items-center gap-2 font-medium text-[#8a8f99] transition-colors hover:text-rose"
              >
                <span aria-hidden>&larr;</span>
                MEDICAL-GRADE FACIALS
              </Link>
              <BookAppointmentButton className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-3 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
                <span aria-hidden>&rarr;</span>
              </BookAppointmentButton>
              <Link
                href="/injectables-wrinkle-prevention"
                className="inline-flex items-center gap-2 font-medium text-[#8a8f99] transition-colors hover:text-rose"
              >
                WRINKLE PREVENTION
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </Reveal>
</div>
    
    </section>
  );
}