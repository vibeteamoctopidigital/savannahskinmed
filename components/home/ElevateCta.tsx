import Image from 'next/image';

import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/ui/Reveal';

export default function ElevateCta() {
  return (
    <section className="relative flex min-h-[380px] items-center overflow-hidden bg-[#cbab92] lg:min-h-[492px]">
      <Image
        src="/images/hero-bg.jpg"
        alt="Group of women enjoying the results of their aesthetic treatments"
        fill
        sizes="100vw"
        className="object-cover object-[85%_center] sm:object-center"
      />

      {/* Soft left scrim so the headline stays legible over the tan backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/22 via-black/5 to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative z-10 py-16">
        <Reveal className="mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
          <h2 className="display-2 text-white text-shadow-hero">Elevate And Enhance</h2>

          <p className="mx-auto mt-5 max-w-[400px] text-[17px] leading-[1.75] text-white text-shadow-hero lg:mx-0 lg:text-[15px] lg:leading-[1.85]">
            Start your journey toward a more radiant, youthful appearance.
          </p>

          <ButtonLink href="/contact-us" className="mt-9">
            Book Appointment
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
