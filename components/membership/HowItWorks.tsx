import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

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

export default function HowItWorks() {
  return (
    <section className="bg-white">
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
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-20 lg:py-20 bg-[#fbfbfb]">
          <Reveal className="max-w-[480px]">
            <p className="eyebrow mb-4 text-navy">SIMPLE. STRUCTURED. EFFECTIVE.</p>
            <h2 className="display-3 italic mb-10 text-navy">How It Works</h2>

            <div className="space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#be8596] text-[15px] font-semibold text-white">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-[19px] font-serif text-navy mb-1.5">{step.title}</h3>
                    <p className="text-[15px] leading-[1.65] text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
