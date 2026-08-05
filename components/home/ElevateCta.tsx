import Image from 'next/image';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import Reveal from '@/components/ui/Reveal';

export default function ElevateCta() {
  return (
    <section className="relative flex min-h-[380px] items-center overflow-hidden bg-[#cbab92] lg:min-h-[440px]">
      <Image
        src="/images/hero-bg.png"
        alt="Group of women enjoying the results of their aesthetic treatments"
        fill
        sizes="100vw"
        className="object-cover object-[85%_center] sm:object-center"
      />

      {/* Soft left scrim so the headline stays legible over the tan backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/22 via-black/25 to-transparent"
        aria-hidden="true"
      />
 <div className="absolute inset-0 bg-black/25 sm:hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/12 to-black/22 sm:hidden" />
      <div className="shell relative z-10 py-16">
        <Reveal className="text-center sm:text-left">
          <h2 className="font-serif font-medium text-[48px] leading-[1.1] text-white ">Elevate And Enhance</h2>

          <p className="mt-5 text-[18px] sm:text-[20px] leading-[1.5] text-white ">
            Start your journey toward a more radiant, youthful appearance.
          </p>

          <BookAppointmentButton className="mt-9" />
        </Reveal>
      </div>
    </section>
  );
}
