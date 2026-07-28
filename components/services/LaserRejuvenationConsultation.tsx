import Reveal from '@/components/ui/Reveal';
import { ArrowRight } from '@/components/icons';

export default function LaserRejuvenationConsultation() {
  return (
    <section className="section bg-mist pb-24 pt-0">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#b18190] px-8 py-16 text-center text-white sm:px-16 sm:py-20 lg:py-24">
            {/* Background decorative pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polygon fill="currentColor" points="0,100 100,0 100,100" />
              </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-[700px]">
              <h2 className="font-serif text-[32px] sm:text-[40px] lg:text-[48px]">
                Book Your Aesthetic Consultation Today
              </h2>
              <p className="mt-6 text-[16px] leading-[1.8] sm:text-[18px]">
                Our experienced team is ready to help you achieve your skincare goals. Schedule your consultation to determine the best treatment approach for your unique needs.
              </p>
              
              <button className="mt-10 inline-flex items-center gap-4 rounded-full bg-navy px-8 py-4 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
