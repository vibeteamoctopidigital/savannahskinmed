import Image from 'next/image';
import Link from 'next/link';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import { ArrowRight } from '@/components/icons';

export default function Hero() {
  return (
    // The original's mobile banner is a fixed ~690px tall regardless of
    // viewport height; only desktop scales with the screen.
    <section className="relative flex h-[100svh] min-h-[580px] max-h-[750px] items-center overflow-hidden bg-[#b9bcc2] sm:h-[690px] sm:max-h-[690px] lg:h-screen lg:min-h-[600px] lg:max-h-[880px]">
      <Image
        src="/images/banner-bg.jpg"
        alt="Woman with radiant, healthy skin after an aesthetic treatment"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[65%_20%] sm:object-[70%_center] lg:object-[72%_center]"
      />

      {/* Subtle dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 sm:bg-black/20 lg:bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent sm:bg-gradient-to-r sm:from-black/40 sm:via-black/10 sm:to-transparent" />

      <div className="shell relative z-10 pt-24 sm:pt-28 lg:pt-20">
        {/* Centred through tablet, left-aligned from desktop up. */}
        <div className="mx-auto max-w-[780px] text-center lg:mx-0 lg:text-left">
          <h1 className="display-1 !text-[36px] sm:!text-[48px] lg:!text-[64px] leading-[1.1] animate-fadeUp text-white drop-shadow-md [text-wrap:initial]">
            Redefining Beauty With
            <br className="hidden lg:block" /> Precision And Care
          </h1>

          <p className="mx-auto mt-5 lg:mt-7 max-w-[645px] animate-fadeUp text-[17px] lg:text-[20px] leading-[1.4] lg:leading-[1.5] text-white drop-shadow-md [animation-delay:120ms] lg:mx-0">
            Customized medical aesthetic solutions to enhance your glow and restore youthful
            skin.
          </p>

          <div className="mt-8 flex animate-fadeUp flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-5 [animation-delay:240ms] lg:justify-start">
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
