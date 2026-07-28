import Reveal from '@/components/ui/Reveal';
import { BadgeDollarIcon, CalendarClockIcon, GiftIcon, BloomIcon } from './MembershipIcons';

const benefits = [
  {
    title: 'Members-Only Pricing',
    description: 'Access discounted rates on treatments and premium skincare products.',
    icon: BadgeDollarIcon,
  },
  {
    title: 'Rollover Monthly Credits',
    description: 'Your credits roll over each month. Use them for your favorite treatments.',
    icon: CalendarClockIcon,
  },
  {
    title: 'Welcome Gifts',
    description: 'Receive a special gift upon sign-up and a complimentary birthday treatment.',
    icon: GiftIcon,
  },
  {
    title: 'Exclusive Perks',
    description: 'Get priority booking, access to members-only events, and special promotions.',
    icon: BloomIcon,
  },
];

export default function MemberBenefits() {
  return (
    <section className="bg-cream pb-16 lg:pb-24">
      <div className="shell max-w-[1000px]">
        <Reveal className="text-center mb-12">
          <p className="eyebrow mb-4 text-navy">EXCLUSIVE ADVANTAGES</p>
          <h2 className="display-3 italic">Member Benefits</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          {benefits.map((benefit, index) => (
            <Reveal key={index} className="rounded-[16px] bg-white p-7 shadow-sm flex items-start gap-5">
              <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3f1] text-[#85a8a1]">
                <benefit.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-[17px] font-serif text-navy mb-1.5">{benefit.title}</h4>
                <p className="text-[14px] leading-[1.6] text-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center">
          <p className="text-[13px] text-muted/70 max-w-[700px] mx-auto leading-[1.6]">
            *Memberships require a 6-month initial commitment. Monthly credits can be applied toward the cost of treatments or skincare products.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
