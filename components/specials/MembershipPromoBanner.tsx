import Image from 'next/image';

import RequestButton from '@/components/booking/RequestButton';
import type { MembershipPromoData } from '@/lib/data/shape';

export default function MembershipPromoBanner({ promo }: { promo: MembershipPromoData }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#a97c5c] to-[#e9caa4]">
      <Image
        src={promo.image}
        alt="Aesthetic Membership Program"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'right center' }}
      />

      <div className="relative px-8 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div className="max-w-[560px]">
          <h2 className="display-2 text-white">
            {promo.headingStart} <em className="italic">{promo.headingEmphasis}</em>{' '}
            {promo.headingEnd}
          </h2>
          <p className="mt-4 font-serif text-[20px] text-white">{promo.tagline}</p>
          <p className="mt-6 max-w-[480px] text-[15.5px] leading-[1.75] text-white/95">
            {promo.description}
          </p>

          <ul className="mt-6 space-y-2">
            {promo.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[15px] text-white">
                <span aria-hidden="true">&bull;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <RequestButton className="mt-9" withArrow>
            {promo.ctaLabel}
          </RequestButton>
        </div>
      </div>
    </div>
  );
}
