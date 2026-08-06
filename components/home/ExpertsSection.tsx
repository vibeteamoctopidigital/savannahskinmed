import Image from 'next/image';

import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/ui/Reveal';

export default function ExpertsSection() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative h-[380px] bg-navy-deep sm:h-[480px] lg:h-auto lg:min-h-[560px]">
        <Image
          src="https://res.cloudinary.com/khs2rcsr/image/upload/v1785410530/asstechin_bpi1bv.jpg"
          alt="Licensed aesthetic provider at Savannah Age Management Medicine"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[center_18%]"
        />
      </div>

      <div className="flex items-center bg-[#F7F8F2] px-6 py-16 sm:px-10 lg:px-[86px] lg:py-20">
        <Reveal className="mx-auto max-w-[560px] text-center lg:max-w-none lg:text-left">
          <p className="mb-4 font-sans text-[14px] font-bold uppercase tracking-[2.8px] text-[#0B2055]">
            Who We Are
          </p>

          <h2 className="font-serif font-medium text-[36px] leading-[1.1] sm:text-[48px] text-[#0B2055]">
            Experts In Aesthetic <br className="hidden lg:inline" /> Excellence
          </h2>

          <p className="mt-6 text-[16px] leading-[1.5] text-[#0B2055]">
            Committed to enhancing your beauty and confidence through advanced aesthetic
            treatments.
          </p>

          <p className="mt-5 text-[16px] lg:max-w-[540px] leading-[1.5] text-[#0B2055]">
            Our licensed team uses years of clinical experience to develop a customized skin care
            plan tailored to your skin goals and comfort levels. Experience personalized skincare
            like never before.
          </p>

        <ButtonLink href="/our-experts" className="mt-9">
          Our Experts
        </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
