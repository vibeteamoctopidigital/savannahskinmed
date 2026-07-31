import Reveal from '@/components/ui/Reveal';

const additionalBenefits = [
  {
    title: 'Professional Skincare',
    description:
      'All members receive 10% off medical-grade skincare products, because great results start at home.',
  },
  {
    title: 'Sexual Wellness Add-On',
    description:
      'Enjoy 10% off Plasma Shots for enhanced performance, function, and confidence.',
  },
];

export default function AdditionalBenefits() {
  return (
    <section className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="shell max-w-[1080px]">
        <Reveal className="mb-10 sm:mb-12 text-left">
          <p className="eyebrow mb-3 text-navy font-semibold uppercase tracking-widest2 text-[13px]">
            EXTEND YOUR RESULTS
          </p>
          <h2 className="font-serif text-[38px] sm:text-[46px] text-navy font-normal">
            Additional Benefits
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {additionalBenefits.map((benefit, index) => (
            <Reveal key={index} className="flex items-start gap-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="mt-1 h-6 w-6 shrink-0 text-[#5a8680]"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-[22px] sm:text-[24px] font-serif text-navy font-normal mb-2.5">
                  {benefit.title}
                </h3>
                <p className="text-[15px] sm:text-[15.5px] leading-[1.7] text-[#334e68]">
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

