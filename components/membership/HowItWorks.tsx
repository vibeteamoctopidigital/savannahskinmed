import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import {
  CreditCoinIcon,
  GiftPerkIcon,
  SparkleClusterIcon,
  SyringeIcon,
} from '@/components/icons';

const steps = [
  {
    number: '1',
    title: 'Choose Your Plan',
    description: 'Select the membership that aligns with your goals and lifestyle.',
  },
  {
    number: '2',
    title: 'Build Your Routine',
    description: 'Use your monthly credits toward treatments that support your results.',
  },
  {
    number: '3',
    title: 'Maintain & Enhance',
    description: 'Enjoy consistent care, exclusive savings, and long-term results.',
  },
];

const benefits = [
  {
    icon: CreditCoinIcon,
    title: 'Credits Ready For You',
    description: 'Monthly dues bank to your account and roll forward — so nothing is ever wasted.',
  },
  {
    icon: SparkleClusterIcon,
    title: 'Member-Only Pricing',
    description: 'Discounts on neurotoxins, $50 off filler per syringe, and seasonal offers.',
  },
  {
    icon: SyringeIcon,
    title: 'Use on Almost Anything',
    description: '’Tox, fillers, CO2, PRP, microneedling, peels, skincare, and more.',
  },
  {
    icon: GiftPerkIcon,
    title: 'Birthday Perks',
    description: 'Exclusive gifts and complimentary treatments during your birthday month.',
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="bg-white mt-10 sm:mt-16">
        <div className="flex flex-col lg:flex-row min-h-[550px]">
          {/* Image Side */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
            <Image
              src="/images/photo-content-14-img.jpg"
              alt="Skincare application"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-20 lg:py-20 bg-[#F7F8F2]">
            <Reveal className="mx-auto max-w-[480px] lg:mx-0">
              <div className="text-left">
                <p className="eyebrow mb-4 text-navy font-semibold text-[14px]">SIMPLE. STRUCTURED. EFFECTIVE.</p>
                <h2 className="display-3 sm:text-[40px] mb-6 text-navy font-bold">How It Works</h2>
              </div>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#be8596] text-[13px] font-semibold text-white">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-[18px] font-sans font-semibold text-navy mb-1.5">{step.title}</h3>
                      <p className="text-[15px] leading-[1.65] text-muted">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      
   
    </>
  );
}
