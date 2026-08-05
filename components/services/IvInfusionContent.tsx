import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

export default function IvInfusionContent() {
  return (
    <section id="offerings" className="section bg-mist pt-8 lg:pt-16">
      <div className="shell relative ">
        <Reveal>
          <div className="mx-auto container rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="mb-5 font-serif text-[36px] sm:text-[48px] leading-[1.1] text-[#051E5C]">
                IV Infusion Therapy & Vitamin <br/> Injections Offerings
              </h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8] text-[#555a64]">
                Custom-designed therapies to enhance your overall health, boost immunity, improve skin radiance, and support mental clarity and physical stamina.
              </p>
              <div className="mx-auto mt-8 w-full rounded-full bg-slate-100 py-4 text-center">
                <span className="font-sans text-[15px] font-bold text-navy">Service</span>
              </div>
            </div>

            <div className="mt-12 flex flex-col w-[80%] mx-auto gap-8 text-[15.5px] leading-[1.8] text-ink">
              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
                  Hydration Boost IV Therapy
                </h3>
                <p className="mt-2 text-black">
                  A systemic hydration therapy that restores balance, replenishes fluids, and ensures essential nutrients reach every cell for maximum health benefits.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
                  Immunity Boost Infusion
                </h3>
                <p className="mt-2 text-black">
                  Custom-formulated IV therapy rich in antioxidants and vitamins to fortify your immune system and support overall health, especially during cold and flu seasons.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
                  Glow & Radiance IV Therapy
                </h3>
                <p className="mt-2 text-black">
                  A beauty-boosting infusion designed to improve skin hydration, texture, and glow, nourishing your body from the inside out for a radiant complexion.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[18px] font-bold text-black">
                  Cognitive Support Infusion
                </h3>
                <p className="mt-2 text-black">
                  This tailored formula enhances cognitive function, focus, and mental clarity, perfect for those needing support with concentration and brain health.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[18px] font-bold text-black">
                  Healing & Recovery Infusion
                </h3>
                <p className="mt-2 text-black">
                  Boosts the body&rsquo;s natural healing processes, aiding in tissue repair and post-procedure recovery while reducing inflammation.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-[22px] font-bold text-black">
                  Energy & Stamina Boost IV Therapy
                </h3>
                <p className="mt-2 text-black">
                  Designed to combat fatigue and boost energy levels, this infusion replenishes essential vitamins and minerals to improve endurance and vitality.
                </p>
              </div>

              <div>
                                <h3 className="font-sans text-[22px] font-bold text-black">

                  Vitamin B12 Injection
                </h3>
                <p className="mt-2 text-black">
                  A quick energy booster, this injection enhances metabolism, combats fatigue, and supports overall health with a powerful dose of vitamin B12.
                </p>

                <p className="mt-6 text-[12px] italic text-black">
                  Packages offer savings and are perfect for those looking to maintain long-term wellness and vitality.
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
