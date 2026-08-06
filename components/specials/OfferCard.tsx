import Image from 'next/image';

import ClaimButton from '@/components/booking/ClaimButton';
import type { SpecialCardData } from '@/lib/data/shape';
import BookAppointmentButton from '../booking/BookAppointmentButton';

const ctaClassName =
  'rounded-full bg-navy px-8 py-3 text-[12px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep';

export default function OfferCard({ card }: { card: SpecialCardData }) {
  const offerLabel = card.title ?? card.headline ?? undefined;
  const imageSrc =
    typeof card?.image === 'string' && card.image.trim() !== '' && card.image !== '{}'
      ? card.image
      : '/images/grid-img.jpg';
  const imageAltText =
    typeof card?.imageAlt === 'string' && card.imageAlt.trim() !== ''
      ? card.imageAlt
      : 'Special offer';

  return (
    <div className="group overflow-hidden rounded-[18px] bg-transparent transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-navy/15">
   
      <div className="relative aspect-[4/3] sm:min-w-[516px] sm:min-h-[500px] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAltText}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
       
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-[300px] right-6 font-bold  sm:text-[48px] text-[25px] leading-tight text-white">
              {card.title || card.headline}
            </p>
          </>
      
      </div>

      <div className="py-4 px-4 sm:px-0 sm:py-7 flex flex-col justify-between items-start bg-transparent">
        {card.variant === 'TIERS' ? (
          <>
            <div className="space-y-5">
              {card.tiers.map((tier) => (
                <div key={tier.label}>
                  <p className="text-[24px] text-muted">{tier.label}</p>
                  <p className="text-[24px] font-bold text-black ">{tier.detail}</p>
                </div>
              ))}
            </div>
            <ClaimButton
              className={`mt-7 ${ctaClassName}`}
              withArrow
              offerId={card.id}
              offerLabel={offerLabel}
            >
              { card.variant === 'TIERS' ?  "Book Your Appointment" : card.cta} 
            </ClaimButton>
          </>
        ) : (
          <>
            {card.headline && (
              <h4 className="mb-3 font-sans text-[24px] font-bold leading-snug text-navy">
                {card.headline}
              </h4>
            )}
            <p className="text-[16px] leading-[1.75] text-muted">{card.description}</p>
            <ClaimButton
              className={`mt-7 ${ctaClassName}`}
              withArrow
              offerId={card.id}
              offerLabel={offerLabel}
            >
              
            </ClaimButton>

          </>
        )}
      </div>
    </div>
  );
}
