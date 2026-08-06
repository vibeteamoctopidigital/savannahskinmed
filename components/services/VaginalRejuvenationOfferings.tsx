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
    <section id="offerings" className="section bg-mist pt-8 lg:pt-16">
      <div className="shell relative ">
        <Reveal>
          <div className="mx-auto container rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="mb-5 font-serif text-[36px] sm:text-[48px] leading-[1.1] text-[#051E5C]">
                Vaginal Rejuvenation Offerings
              </h2>
              <p className="mx-auto  text-[16px] leading-[1.8] text-[#555a64]">
                In-office rejuvenation treatments help stimulate blood flow, regeneration in the vaginal region. Treatment is delivered using a small wand, which is inserted into the vagina and gently rotated, delivering pulses to the surrounding tissues.
              </p>
              <div className="mx-auto mt-8 w-full max-w-[1044px] rounded-full bg-[#F5F5F5] px-6 py-4 text-center">
                <span className="font-sans text-[16px] sm:text-[20px] font-bold text-black">Vaginal rejuvenation offers a variety of benefits, including the following:</span>
              </div>
            </div>

            <div className="mt-12 flex w-full flex-col gap-8 text-center md:w-[80%] md:mx-auto md:text-left text-[15.5px] leading-[1.8] text-ink">
              <div>
                <h3 className="font-sans text-[24px] font-bold text-black">
                 Vaginal Tightening & Incontinence Reduction
                </h3>
                <p className="mt-2 text-black">
                 Increase vaginal tightness and reduce symptoms of incontinence, improving both physical function and quality of life.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
                 Elasticity & Strength Improvement
                </h3>
                <p className="mt-2 text-black">
                 Restores vaginal elasticity and strength, helping to reduce laxity and providing a firmer, more youthful appearance.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
               Reduction of Loose Skin
                </h3>
                <p className="mt-2 text-black">
                  Effectively reduces the appearance of loose skin for a more toned and firm vaginal area.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[18px] font-bold text-black">
                 Vaginal Dryness Treatment
                </h3>
                <p className="mt-2 text-black">
                 Helps alleviates dryness, increasing comfort and moisture for a more pleasant, natural sensation.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[18px] font-bold text-black">
                 Improved Vaginal Sensation
                </h3>
                <p className="mt-2 text-black">
                Enhances sensation, improving sexual comfort and intimacy, restoring confidence and pleasure.
                </p>
              </div>

             

              
            </div>

            <div className="mt-12 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-4 border-t border-haze pt-8 text-[14px] uppercase tracking-widest2 text-navy">
              <Link href="/iv-infusion-therapy-vitamin-injections/" className=" hidden sm:flex items-center gap-2 font-bold cursor-pointer text-gray-400 transition-colors">
        
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left-icon lucide-move-left"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
                IV Infusion Therapy
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy py-3 text-[10px] w-full max-w-[273px] h-[50px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/medical-grade-facials" className=" hidden sm:flex items-center gap-2 font-bold cursor-pointer text-gray-400 transition-colors">
                Medical-Grade Facials  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right  transition-transform duration-300 group-hover:translate-x-1"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
