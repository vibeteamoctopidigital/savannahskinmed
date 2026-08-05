import Image from 'next/image';
import Link from 'next/link';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import { ArrowRight } from '@/components/icons';

export default function Hero() {
  return (
    // The original's mobile banner is a fixed ~690px tall regardless of
    // viewport height; only desktop scales with the screen.
    <section className="relative flex h-[690px] items-center overflow-hidden bg-[#b9bcc2] lg:h-screen lg:min-h-[600px] lg:max-h-[880px]">
      <Image
        src="/images/banner-bg.jpg"
        alt="Woman with radiant, healthy skin after an aesthetic treatment"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_top]"
      />

      {/* Added a subtle dark overlay to improve text readability */}
      {/* <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" /> */}

      <div className="shell relative z-10 pt-20">
        {/* Centred through tablet, left-aligned from desktop up. */}
        <div className="mx-auto max-w-[780px] text-center lg:mx-0 lg:text-left">
          <h1 className="display-1 animate-fadeUp text-white text-shadow-hero [text-wrap:initial]">
            Redefining Beauty With
            <br className="hidden lg:block" /> Precision And Care
          </h1>

          <p className="mx-auto mt-7 max-w-[645px] animate-fadeUp text-[20px] leading-[1.5] text-white text-shadow-hero [animation-delay:120ms] lg:mx-0">
            Customized medical aesthetic solutions to enhance your glow and restore youthful
            skin.
          </p>

          <div className="mt-9 flex animate-fadeUp flex-wrap items-center justify-center gap-x-8 gap-y-4 [animation-delay:240ms] lg:justify-start">
            <BookAppointmentButton />

            <Link
              href="/services"
              className="group inline-flex items-center gap-4 font-sans text-[13px] font-medium uppercase tracking-widest2 text-white"
            >
              View Treatments
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 26" fill="none">
<circle cx="12.5" cy="13.4171" r="12.5" fill="white"/>
<path d="M11.043 8.43225L16.0278 13.4171L11.043 18.4019" stroke="#D8A7B7"/>
</svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
