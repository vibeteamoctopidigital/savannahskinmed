// 'use client';

// import { useMemo, useState } from 'react';

// import MembershipPromoBanner from '@/components/specials/MembershipPromoBanner';
// import OfferCard from '@/components/specials/OfferCard';
// import Reveal from '@/components/ui/Reveal';
// import type { MembershipPromoData, SpecialCardData } from '@/lib/data/shape';
// import { specialLocations } from '@/lib/site';

// type SpecialsContentProps = {
//   offersHeading: string;
//   cards: SpecialCardData[];
//   membershipPromo: MembershipPromoData;
// };

// const ALL = 'all';

// export default function SpecialsContent({
//   offersHeading,
//   cards,
//   membershipPromo,
// }: SpecialsContentProps) {
//   const [active, setActive] = useState(ALL);

//   const tabs = [{ slug: ALL, label: 'All' }, ...specialLocations];

//   /* An untagged card (empty `locations`) runs at every clinic, so it stays
//      visible under every tab. */
//   const visible = useMemo(
//     () =>
//       active === ALL
//         ? cards
//         : cards.filter(
//             (card) => card.locations.length === 0 || card.locations.includes(active),
//           ),
//     [cards, active],
//   );

//   return (
//     <section className="section bg-[#F7F8F2]">
     

     
//       <div className="shell">
//         <Reveal className="mb-12 text-center">
//           <h2 className="mb-8 text-[36px] font-medium leading-[1.1] sm:text-[48px]">Select Your Location</h2>

//           <div
//             role="tablist"
//             aria-label="Filter offers by location"
//             className="flex flex-wrap items-center justify-center gap-4"
//           >
//             {tabs.map((tab) => {
//               const isActive = tab.slug === active;
//               return (
//                 <button
//                   key={tab.slug}
//                   type="button"
//                   role="tab"
//                   aria-selected={isActive}
//                   onClick={() => setActive(tab.slug)}
//                   className={`min-w-[190px] rounded-full border px-8 py-3 font-serif text-[24px] transition-colors duration-300 ${
//                     isActive
//                       ? 'border-navy bg-navy text-white'
//                       : 'border-navy/20 bg-transparent text-navy hover:border-navy/50 hover:bg-navy/5'
//                   }`}
//                 >
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>
//         </Reveal>
//       </div>
//       <div className="max-w-[1065px] mx-auto px-4 sm:px-6 lg:px-8">
// <MembershipPromoBanner promo={membershipPromo} />

//       </div>
//       <div className="max-w-[1065px]  bg-transparent mx-auto px-4 sm:px-6 lg:px-8 mt-14">
//         {visible.length === 0 ? (
//           <p className="py-10 text-center text-[15px] text-muted">
//             No offers are running at this location right now. Check back soon.
//           </p>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 min-w-full">
            
//             {visible.map((card, i) => (
//               <Reveal key={card.id} delay={(i % 2) * 90} className='bg-transparent'>
//                 <OfferCard card={card} />
//               </Reveal>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
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
          <h2 className="mb-8 text-[36px] font-medium leading-[1.1] sm:text-[48px]">
            Select Your Location
          </h2>

          {/* Responsive filter row: wraps on tablet, horizontal scroll on small mobile
              so buttons never get crushed or overflow the viewport. */}
          <div
            role="tablist"
            aria-label="Filter offers by location"
            className="-mx-4 flex snap-x snap-mandatory items-center justify-start gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0"
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
                  className={`min-w-fit shrink-0 snap-start rounded-full border px-6 py-2.5 font-serif text-[16px] transition-all duration-300 sm:min-w-[190px] sm:px-8 sm:py-3 sm:text-[24px] ${
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

      {/* key={active} forces this whole block to remount on filter change,
          which restarts the CSS animation below on the banner + every card. */}
     <div key={active}>
  <div className="max-w-[1065px] mx-auto px-4 sm:px-6 lg:px-8 animate-slide-up-in">
    <MembershipPromoBanner promo={membershipPromo} />
  </div>

  <div className="max-w-[1065px] bg-transparent mx-auto px-4 sm:px-6 lg:px-8 mt-14">
    {visible.length === 0 ? (
      <p className="py-10 text-center text-[15px] text-muted">
        No offers are running at this location right now. Check back soon.
      </p>
    ) : (
      <div className="grid gap-8 sm:grid-cols-2 min-w-full">
        {visible.map((card, i) => (
          <div
            key={card.id}
            className="animate-slide-up-in bg-transparent"
            style={{ animationDelay: `${(i % 2) * 90 + 90}ms` }}
          >
            <OfferCard card={card} />
          </div>
        ))}
      </div>
    )}
  </div>
</div>
    </section>
  );
}