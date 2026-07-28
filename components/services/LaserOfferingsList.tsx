import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

const areas = [
  'Full Back',
  'Half Back',
  'Full Bikini',
  'Bikini Line',
  'Full Face',
  'Full Face And Neck',
  'Full Leg',
  'Half Leg',
  'Forearms',
  'Underarms',
  'Abdomen',
  'Buttocks',
  'Chin',
  'Lip',
  'Lip And Chin',
  'Neck',
  'Other',
];

export default function LaserOfferingsList() {
  return (
    <section id="offerings" className="section bg-cream pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-20">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Laser Hair Removal Offerings</h2>
              <p className="mx-auto max-w-[650px] text-[16px] leading-[1.8] text-muted">
                From small areas like the upper lip to larger zones such as the back or legs, our advanced laser technology effectively reduces unwanted hair safely and efficiently. We provide customized treatments committed to quality, precision, and safety.
              </p>
            </div>

            <div className="mt-14">
              <div className="mb-8 flex items-center justify-center gap-4">
                <div className="h-[1px] w-12 bg-haze"></div>
                <span className="font-sans text-[13px] font-bold uppercase tracking-widest2 text-navy">
                  Treatment Areas
                </span>
                <div className="h-[1px] w-12 bg-haze"></div>
              </div>
              
              <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {areas.map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-3 rounded-2xl border border-navy/5 bg-white px-5 py-3.5 transition-all hover:-translate-y-0.5 hover:border-teal/30 hover:bg-teal/5 hover:shadow-sm"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream text-navy transition-colors group-hover:bg-teal/20 group-hover:text-teal">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-sans text-[14px] font-bold text-navy transition-colors group-hover:text-teal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/medical-grade-facials" className="font-medium cursor-pointer hover:text-rose transition-colors">
                &larr; MEDICAL-GRADE FACIALS
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy px-8 py-3.5 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/injectables-wrinkle-prevention" className="font-medium cursor-pointer hover:text-rose transition-colors">
                INJECTABLES &amp; WRINKLE PREVENTION &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
