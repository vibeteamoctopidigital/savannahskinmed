import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

export default function IvInfusionContent() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">
                IV Infusion Therapy & Vitamin Injections Offerings
              </h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
                Custom-designed therapies to enhance your overall health, boost immunity, improve skin radiance, and support mental clarity and physical stamina.
              </p>
              <div className="mx-auto mt-8 inline-flex rounded-full bg-cream px-8 py-3">
                <span className="font-sans text-[15px] font-bold tracking-widest text-navy uppercase">
                  Service
                </span>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-8 text-[15.5px] leading-[1.8] text-ink">
              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Hydration Boost IV Therapy
                </h3>
                <p className="mt-2 text-muted">
                  A premium hydration infusion that restores moisture, replenishes fluids, and ensures optimal water balance. Every cell will be invigorated with moisture.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Immunity Boost Infusion
                </h3>
                <p className="mt-2 text-muted">
                  Custom-formulated IV therapy rich in antioxidants and vitamins to fortify your immune system and support overall health, especially during cold and flu seasons.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Glow & Radiance IV Therapy
                </h3>
                <p className="mt-2 text-muted">
                  A beauty-boosting infusion designed to improve skin hydration, texture, and glow, nourishing your body from the inside out for a radiant complexion.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Cognitive Support Infusion
                </h3>
                <p className="mt-2 text-muted">
                  This tailored IV treatment is designed to enhance focus, and mental clarity, perfect for those seeking an optimal neuroprotective and brain health.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Healing & Recovery Infusion
                </h3>
                <p className="mt-2 text-muted">
                  Excellent choice for those healing a procedure, optimal without rapid post-procedure recovery while reducing inflammation.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Energy & Stamina Boost IV Therapy
                </h3>
                <p className="mt-2 text-muted">
                  Designed to combat fatigue and boost energy levels, this infusion replenishes essential vitamins and minerals to improve endurance and vitality.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Vitamin B12 Injection
                </h3>
                <p className="mt-2 text-muted">
                  A quick, energy-boosting shot that is an enormous advantage in maximizing your overall performance with health with a pure fat dose of vitamin B12.
                </p>
                
                <p className="mt-6 text-[12px] italic text-muted">
                  Packages also configured at our clinic for discount pricing for team building, bachelorette/bachelor parties, etc.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <Link href="/laser-skin-rejuvenation" className="font-medium cursor-pointer hover:text-rose transition-colors">
                &larr; LASER SKIN REJUVENATION
              </Link>
              <BookAppointmentButton className="rounded-full bg-navy px-8 py-3 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
              <Link href="/vaginal-rejuvenation" className="font-medium cursor-pointer hover:text-rose transition-colors">
                VAGINAL REJUVENATION &rarr;
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
