import Image from 'next/image';

import ClaimButton from '@/components/booking/ClaimButton';
import type { SpecialCardData } from '@/lib/data/shape';

const ctaClassName =
  'rounded-full bg-navy px-8 py-3 text-[12px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep';

export default function OfferCard({ card }: { card: SpecialCardData }) {
  const offerLabel = card.title ?? card.headline ?? undefined;

  return (
    <div className="group overflow-hidden rounded-[18px] bg-white shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/15">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {card.title && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <h3 className="absolute bottom-5 left-6 right-6 font-serif text-[24px] leading-tight text-white text-shadow-hero">
              {card.title}
            </h3>
          </>
        )}
      </div>

      <div className="p-7 sm:p-8">
        {card.variant === 'TIERS' ? (
          <>
            <div className="space-y-5">
              {card.tiers.map((tier) => (
                <div key={tier.label}>
                  <p className="text-[14px] text-muted">{tier.label}</p>
                  <p className="text-[16px] font-bold text-navy">{tier.detail}</p>
                </div>
              ))}
            </div>
            <ClaimButton
              className={`mt-7 ${ctaClassName}`}
              withArrow
              offerId={card.id}
              offerLabel={offerLabel}
            >
              {card.cta}
            </ClaimButton>
          </>
        ) : (
          <>
            {card.headline && (
              <h4 className="mb-3 font-sans text-[17px] font-bold leading-snug text-navy">
                {card.headline}
              </h4>
            )}
            <p className="text-[14.5px] leading-[1.75] text-muted">{card.description}</p>
            <ClaimButton
              className={`mt-7 ${ctaClassName}`}
              withArrow
              offerId={card.id}
              offerLabel={offerLabel}
            >
              {card.cta}
            </ClaimButton>
          </>
        )}
      </div>
    </div>
  );
}
