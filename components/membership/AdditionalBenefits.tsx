import Reveal from '@/components/ui/Reveal';

const additionalBenefits = [
  {
    title: 'Flexible Treatment Wallet',
    description: 'Your monthly credits accumulate in your "Wallet" and can be used on any service or product.',
  },
  {
    title: 'Share With a Friend or Family Member',
    description: 'You can gift a portion of your credits to a family member or friend up to twice a year.',
  },
];

export default function AdditionalBenefits() {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="shell max-w-[1000px]">
        <Reveal className="mb-12">
          <p className="eyebrow mb-4 text-navy">BEYOND THE BASICS</p>
          <h2 className="display-3 italic text-navy">Additional Benefits</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {additionalBenefits.map((benefit, index) => (
            <Reveal key={index} className="flex items-start gap-4">
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-[#85a8a1]" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h4 className="text-[17px] font-semibold font-sans text-navy mb-2">{benefit.title}</h4>
                <p className="text-[15px] leading-[1.65] text-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
