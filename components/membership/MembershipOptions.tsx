import RequestButton from '@/components/booking/RequestButton';
import Reveal from '@/components/ui/Reveal';

type PlanFeature = {
  title: string;
  description?: string;
};

type Plan = {
  tierLabel: string;
  name: string;
  price: string;
  subtitle: string;
  features: PlanFeature[];
  bg: string;
  btmTitle: string;
};

const essentialsFeatures: PlanFeature[] = [
  { title: '$129/Mo Banked Credit', description: 'applied to your account each month, rolls forward' },
  { title: '10% Off Neurotoxin', description: 'including Botox and Dysport' },
  { title: '$50 Off Every Filler Syringe', description: 'Versa, Restylane and more' },
  {
    title: '3 Skin Maintenance Visits/Year',
    description: 'choose from spot laser hair removal, chemical peels, or dermaplaning',
  },
  { title: '10% Off Professional Skincare', description: 'medical-grade products at member pricing' },
  { title: '10% Off Plasma Shots', description: 'female & male sexual wellness treatments' },
  { title: 'Birthday Perk', description: '10 complimentary neurotoxin units during your birthday month' },
  { title: 'Priority Scheduling + Member-Only Offers', description: 'throughout the year' },
  { title: 'Fullscript Access', description: 'get discounted pricing on professional grade dietary supplements' },
];

const skinRevivalFeatures: PlanFeature[] = [
  { title: '$299/Mo Banked Credit', description: 'applied monthly, rolls forward' },
  { title: '10% Off Neurotoxin', description: 'including Botox and Dysport' },
  { title: '$50 Off Every Filler Syringe', description: 'across all dermal filler products' },
  {
    title: '10% Off Laser & Medical Aesthetic Treatments',
    description: 'resurfacing, microneedling, IPL, and more',
  },
  { title: '3 Skin Rejuvenation Visits/Year', description: 'spot laser, peels, dermaplaning' },
  { title: '$300 Off Annual CO2 Laser Resurfacing', description: 'SAMM’s most transformative treatment' },
  { title: '25% Off PRP Add-Ons', description: 'face, skin tightening, hair restoration' },
  { title: '10% Off Plasma Shots + 10% Off Professional Skincare' },
  { title: 'Birthday Perk', description: 'complimentary skincare product of your choice' },
  { title: 'Fullscript Access', description: 'get discounted pricing on professional grade dietary supplements' },
];

const plans: Plan[] = [
  {
    tierLabel: 'Membership Tier 01',
    name: 'Aesthetic Essentials',
    price: '$129',
    subtitle: 'For patients who want predictable, routine injectable care.',
    features: essentialsFeatures,
    bg: 'bg-rose',
    btmTitle: '3-month minimum term required',
    
  },
  {
    tierLabel: 'Membership Tier 02',
    name: 'Skin Revival',
    price: '$299',
    subtitle: 'For patients ready for real, visible skin transformation.',
    features: skinRevivalFeatures,
    bg: 'bg-[#14214B]',
    btmTitle: '6-month minimum term required',

  },
];

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M11.2842 24C11.2804 24 11.276 24 11.2723 24C11.1173 23.9969 10.971 23.9306 10.866 23.8169L0.150017 12.1646C-0.0337288 11.9646 -0.0506034 11.6634 0.110018 11.444C0.27064 11.2253 0.563134 11.1503 0.809379 11.2653L10.6173 15.8577C10.6998 15.8964 10.7973 15.8777 10.8604 15.812L25.8214 0.175495C26.0239 -0.0363759 26.3551 -0.0595005 26.5851 0.122996C26.8151 0.305492 26.8682 0.632985 26.7076 0.878605L11.8254 23.6769C11.8042 23.71 11.7792 23.74 11.7517 23.7681L11.686 23.8338C11.5792 23.94 11.4342 24 11.2842 24Z"
        fill="#CFE1E0"
      />
    </svg>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Reveal className={`relative overflow-hidden rounded-[20px] text-white ${plan.bg}`}>
      <div className="p-8 sm:p-10 md:p-12 flex flex-col justify-between h-full">
        <div>
          <div className="text-center">
          <p className="eyebrow text-white text-[14px] font-bold">{plan.tierLabel}</p>
          <p className="mt-4 font-serif  text-[25px] text-white">{plan.name}</p>
          <div className="mt-2 font-serif text-[32px] leading-none text-white sm:text-[48px]">
            {plan.price}
            <span className="text-[48px]"> / month</span>
          </div>
          <p className="mx-auto mt-4 max-w-[280px] text-[16px] leading-[1.6] text-white/90">
            {plan.subtitle}
          </p>
        </div>

        <ul className="mt-10 space-y-5">
          {plan.features.map((feature) => (
            <li key={feature.title} className="flex items-start gap-3">
              <CheckIcon className="mt-1 h-[18px] w-[22px] shrink-0" />
              <div>
                <p className="text-[22px] font-bold leading-[1.4]  text-white/90">{feature.title}</p>
                {feature.description && (
                  <p className="mt-0.5 text-[16px] leading-[1.5] text-white">
                    {feature.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        </div>

        <p className="mt-10 text-center justify-end text-[14px] italic text-white/60">{plan.btmTitle}</p>
      </div>
    </Reveal>
  );
}

export default function MembershipOptions() {
  return (
    <section className="section bg-white" id="membership-options">
      <div className="container">
        <Reveal className="mb-16 text-center">
          <p className="eyebrow mb-4 text-navy font-semibold text-[16px]">CHOOSE YOUR PLAN</p>
          <h2 className="display-1v2 text-navy">Membership Options</h2>
        </Reveal>

        <div className="mb-12 grid grid-cols-1 max-w-[1245px] mx-auto gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <Reveal className="text-center">
          <RequestButton >Request More Details</RequestButton>
        </Reveal>
      </div>
    </section>
  );
}
