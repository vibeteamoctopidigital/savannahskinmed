import Image from 'next/image';
import Link from 'next/link';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import { ArrowRight } from '@/components/icons';

type ServiceHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  position?: string;
  hideButtons?: boolean;
};

export default function ServiceHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  position = 'center',
  hideButtons = false,
}: ServiceHeroProps) {
  return (
    <section className="relative flex min-h-[540px] max-h-[680px] items-center justify-center overflow-hidden bg-[#b9bcc2] py-16 sm:min-h-[690px] sm:max-h-none sm:py-24 lg:min-h-[85vh] lg:max-h-[880px] lg:py-32">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />

      {/* Stronger mobile overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 sm:bg-gradient-to-r sm:from-black/40 sm:via-black/10 sm:to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="shell relative z-10 pt-24 pb-4 sm:pt-28 md:pb-6 lg:pb-8">
        <div className="mx-auto max-w-[780px] text-center">
          {eyebrow && (
            <p className="eyebrow mb-3 sm:mb-4 animate-fadeUp text-white font-semibold text-[12px] sm:text-[13px] uppercase tracking-widest2">
              {eyebrow}
            </p>
          )}
          <h1 className="animate-fadeUp text-white 
           [text-wrap:initial] [animation-delay:100ms] font-serif text-[44px] leading-[1.12] sm:text-[48px] lg:text-[64px]">
            {title}
          </h1>

          {intro && (
            <p className="mx-auto mt-5 sm:mt-6 max-w-[580px] animate-fadeUp text-[19px] sm:text-[20px] lg:text-[21px] leading-[1.65] sm:leading-[1.7] text-white 
             [animation-delay:150ms] px-2 sm:px-0">
              {intro}
            </p>
          )}

          {!hideButtons && (
            <div className="mt-10 flex flex-col animate-fadeUp items-center justify-center gap-5 sm:flex-row sm:gap-x-8 [animation-delay:240ms]">
              <BookAppointmentButton />

              <Link
                href="#offerings"
                className="group inline-flex items-center justify-center gap-4 font-sans text-[13px] font-medium uppercase tracking-widest2 text-white"
              >
                Learn More
                 <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:translate-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 25 26" fill="none">
<circle cx="12.5" cy="13.4171" r="12.5" fill="white"/>
<path d="M11.043 8.43225L16.0278 13.4171L11.043 18.4019" stroke="#D8A7B7"/>
</svg></span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

