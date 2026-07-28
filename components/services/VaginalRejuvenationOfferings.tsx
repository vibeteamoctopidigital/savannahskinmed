import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

const offerings = [
  {
    title: 'Vaginal Tightening & Incontinence Reduction',
    description:
      'Increase vaginal tightness to reduce symptoms of incontinence, improving both physical function and quality of life.',
  },
  {
    title: 'Elasticity & Strength Improvement',
    description:
      'Restore vaginal tone, enhance strength, and rebuild tissue elasticity for a firmer, more youthful appearance.',
  },
  {
    title: 'Reduction Of Loose Skin',
    description:
      'Effectively reduce the appearance of loose skin for a smoother and firmer vaginal area.',
  },
  {
    title: 'Vaginal Dryness Treatment',
    description:
      'Help alleviate dryness and restore comfort and moisture for a more pleasant, natural sensation.',
  },
  {
    title: 'Improved Vaginal Sensation',
    description:
      'Enhance sensation, improving sexual comfort and intimacy, restoring confidence and pleasure.',
  },
];

export default function VaginalRejuvenationOfferings() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Vaginal Rejuvenation Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
                In-office rejuvenation treatments help stimulate blood flow, regeneration in the vaginal region. Treatment is delivered using a small wand, which is inserted into the vagina and gently rotated, delivering pulses to the surrounding tissues.
              </p>
              <div className="mx-auto mt-8 inline-flex rounded-full bg-cream px-8 py-3">
                <span className="font-sans text-[15px] font-bold tracking-widest text-navy">
                  Vaginal rejuvenation offers a variety of benefits, including the following:
                </span>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-8 text-[15.5px] leading-[1.8] text-ink text-center md:text-left">
              {offerings.map((offering, i) => (
                <div key={i}>
                  <h3 className="font-sans text-[17px] font-bold text-navy">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-muted">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/iv-infusion-therapy-vitamin-injections" className="font-medium cursor-pointer hover:text-rose transition-colors">
                &larr; IV INFUSION THERAPY
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy px-8 py-3 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/medical-grade-facials" className="font-medium cursor-pointer hover:text-rose transition-colors">
                MEDICAL-GRADE FACIALS &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
