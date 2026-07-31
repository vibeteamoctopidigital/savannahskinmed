import Reveal from '@/components/ui/Reveal';
import { CreditsIcon, MemberPricingIcon, SyringeIcon, BirthdayPerksIcon } from './MembershipIcons';

const benefits = [
  {
    title: 'Credits Ready For You',
    description: 'Monthly dues bank to your account and roll forward — so nothing is ever wasted.',
    icon: CreditsIcon,
  },
  {
    title: 'Member-Only Pricing',
    description: 'Discounts on neurotoxins, $50 off filler per syringe, and seasonal offers.',
    icon: MemberPricingIcon,
  },
  {
    title: 'Use on Almost Anything',
    description: "'Tox, fillers, CO2, PRP, microneedling, peels, skincare, and more.",
    icon: SyringeIcon,
  },
  {
    title: 'Birthday Perks',
    description: 'Exclusive gifts and complimentary treatments during your birthday month.',
    icon: BirthdayPerksIcon,
  },
];

export default function MemberBenefits() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="shell max-w-[1080px]">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-3 text-navy font-semibold uppercase tracking-widest2 text-[13px]">
            MORE VALUE, EVERY VISIT
          </p>
          <h2 className="font-serif text-[38px] sm:text-[46px] text-navy font-normal">
            Member Benefits
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <Reveal
              key={index}
              className="rounded-[18px] bg-white p-7 sm:p-8 shadow-sm flex items-start gap-5 sm:gap-6"
            >
              <div className="shrink-0 flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#5a8680] text-[#3d6e68]">
                <benefit.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-[22px] sm:text-[23px] font-serif text-navy font-normal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[15px] sm:text-[15.5px] leading-[1.65] text-[#334e68]">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

