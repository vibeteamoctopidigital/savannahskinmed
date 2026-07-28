import MembershipPromoBanner from '@/components/specials/MembershipPromoBanner';
import OfferCard from '@/components/specials/OfferCard';
import Reveal from '@/components/ui/Reveal';
import type { MembershipPromoData, SpecialCardData } from '@/lib/data/shape';

type SpecialsContentProps = {
  offersHeading: string;
  cards: SpecialCardData[];
  membershipPromo: MembershipPromoData;
};

export default function SpecialsContent({
  offersHeading,
  cards,
  membershipPromo,
}: SpecialsContentProps) {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <Reveal className="text-center">
          <h2 className="display-3 mb-8">{offersHeading}</h2>
        </Reveal>
      </div>

      <Reveal className="mb-14 mx-auto max-w-[1440px] relative">
        <MembershipPromoBanner promo={membershipPromo} />
      </Reveal>

      <div className="shell">
        <div className="grid gap-8 sm:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={(i % 2) * 90}>
              <OfferCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
