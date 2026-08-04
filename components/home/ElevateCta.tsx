import Image from 'next/image';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import Reveal from '@/components/ui/Reveal';

export default function ElevateCta() {
  return (
    <section className="relative flex min-h-[380px] items-center overflow-hidden bg-[#cbab92] lg:min-h-[492px]">
      <Image
        src="/images/hero-bg.png"
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
        <Reveal className="mx-auto container text-center sm:text-left">
          <h2 className="display-2 text-white text-shadow-hero text-[48px] ">Elevate And Enhance</h2>

          <p className=" mt-5 min-w-[400px] text-[15px] leading-[1.75] text-white text-shadow-hero lg:text-[20px] lg:leading-[1.85]">
            Start your journey toward a more radiant, youthful appearance.
          </p>

          <BookAppointmentButton className="mt-9" />
        </Reveal>
      </div>
    </section>
  );
}
