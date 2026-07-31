import Image from 'next/image';

import RequestButton from '@/components/booking/RequestButton';
import type { MembershipPromoData } from '@/lib/data/shape';

export default function MembershipPromoBanner({ promo }: { promo: MembershipPromoData }) {
  const imageSrc =
    typeof promo?.image === 'string' && promo.image.trim() !== '' && promo.image !== '{}'
      ? promo.image
      : '/images/grid-9-img.jpg';

  return (
    <div className="relative overflow-hidden min-h-[580px] sm:min-h-[500px] flex items-center bg-gradient-to-r from-[#a97c5c] to-[#e9caa4]">
      <Image
        src={imageSrc}
        alt="Aesthetic Membership Program"
        fill
        sizes="100vw"
        className="object-cover object-[74%_45%] sm:object-[80%_center] lg:object-[right_center]"
      />



      <div className="relative z-10 w-full px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
        <div className="max-w-[560px] mx-auto sm:mx-0 text-center sm:text-left">
          <h2 className="font-serif text-[40px] sm:text-[48px] leading-[1.12] text-white">
            {promo.headingStart} <em className="italic">{promo.headingEmphasis}</em>{' '}
            {promo.headingEnd}
          </h2>
          <p className="mt-5 text-[22px] sm:text-[24px] font-medium text-white leading-snug">
            {promo.tagline}
          </p>
          <p className="mt-6 max-w-[480px] mx-auto sm:mx-0 text-[16px] sm:text-[15.5px] leading-[1.75] text-white/95">
            {promo.description}
          </p>

          <ul className="mt-7 space-y-2.5 max-w-[400px] mx-auto sm:mx-0 text-left">
            {promo.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-[15px] sm:text-[15.5px] text-white">
                <span aria-hidden="true" className="text-white">&bull;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex justify-center sm:justify-start">
            <RequestButton withArrow>
              {promo.ctaLabel}
            </RequestButton>
          </div>
        </div>
      </div>
    </div>
  );
}

