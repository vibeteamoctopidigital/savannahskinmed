'use client';

import { useMemo, useState } from 'react';

import MembershipPromoBanner from '@/components/specials/MembershipPromoBanner';
import OfferCard from '@/components/specials/OfferCard';
import Reveal from '@/components/ui/Reveal';
import type { MembershipPromoData, SpecialCardData } from '@/lib/data/shape';
import { specialLocations } from '@/lib/site';

type SpecialsContentProps = {
  offersHeading: string;
  cards: SpecialCardData[];
  membershipPromo: MembershipPromoData;
};

const ALL = 'all';

export default function SpecialsContent({
  offersHeading,
  cards,
  membershipPromo,
}: SpecialsContentProps) {
  const [active, setActive] = useState(ALL);

  const tabs = [{ slug: ALL, label: 'All' }, ...specialLocations];

  /* An untagged card (empty `locations`) runs at every clinic, so it stays
     visible under every tab. */
  const visible = useMemo(
    () =>
      active === ALL
        ? cards
        : cards.filter(
            (card) => card.locations.length === 0 || card.locations.includes(active),
          ),
    [cards, active],
  );

  return (
    <section className="section bg-[#F7F8F2]">
     

     
      <div className="shell">
        <Reveal className="mb-12 text-center">
          <h2 className="display-3 mb-8 sm:text-[48px] font-medium">Select Your Location</h2>

          <div
            role="tablist"
            aria-label="Filter offers by location"
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {tabs.map((tab) => {
              const isActive = tab.slug === active;
              return (
                <button
                  key={tab.slug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.slug)}
                  className={`min-w-[190px] rounded-full border px-8 py-3 font-serif text-[24px] transition-colors duration-300 ${
                    isActive
                      ? 'border-navy bg-navy text-white'
                      : 'border-navy/20 bg-transparent text-navy hover:border-navy/50 hover:bg-navy/5'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>
      <div className="max-w-[1065px] mx-auto px-4 sm:px-6 lg:px-8">
<MembershipPromoBanner promo={membershipPromo} />

      </div>
      <div className="max-w-[1065px]  bg-transparent mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        {visible.length === 0 ? (
          <p className="py-10 text-center text-[15px] text-muted">
            No offers are running at this location right now. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 min-w-full">
            
            {visible.map((card, i) => (
              <Reveal key={card.id} delay={(i % 2) * 90} className='bg-transparent'>
                <OfferCard card={card} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
