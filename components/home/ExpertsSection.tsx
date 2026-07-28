import Image from 'next/image';

import ButtonLink from '@/components/ui/ButtonLink';
import Reveal from '@/components/ui/Reveal';

export default function ExpertsSection() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="relative h-[380px] bg-navy-deep sm:h-[480px] lg:h-auto lg:min-h-[560px]">
        <Image
          src="/images/photo-content-10-img.jpg"
          alt="Licensed aesthetic provider at Savannah Age Management Medicine"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[center_18%]"
        />
      </div>

      <div className="flex items-center bg-cream px-6 py-16 sm:px-10 lg:px-[86px] lg:py-20">
        <Reveal className="mx-auto max-w-[460px] text-center lg:mx-0 lg:text-left">
          <p className="eyebrow mb-4 text-rose-deep">Who We Are</p>

          <h2 className="display-2">Experts In Aesthetic Excellence</h2>

          <p className="mt-6 text-[16px] leading-[1.8] lg:text-[14.5px] lg:leading-[1.9]">
            Committed to enhancing your beauty and confidence through advanced aesthetic
            treatments.
          </p>

          <p className="mt-5 text-[16px] leading-[1.8] lg:text-[14.5px] lg:leading-[1.9]">
            Our licensed team uses years of clinical experience to develop a customized skin care
            plan tailored to your skin goals and comfort levels. Experience personalized skincare
            like never before.
          </p>

          <ButtonLink href="/our-clinic" className="mt-9">
            Our Experts
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
