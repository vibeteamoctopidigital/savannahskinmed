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
    <section >
      <div className="sm:max-w-[1245px] w-[85%] mx-auto bg-[#F7F8F2] py-16 sm:py-20 lg:py-24 lg:px-20 sm:px-6 px-4">
        <Reveal className="mb-10 sm:mb-12 text-center md:text-left">
          <p className="eyebrow mb-3 text-navy font-bold uppercase tracking-widest2 text-[14px]">
            EXTEND YOUR RESULTS
          </p>
          <h2 className="font-serif text-[38px] sm:text-[48px] sm:leading-normal leading-[38px] text-navy font-medium">
            Additional Benefits
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-6">
          {additionalBenefits.map((benefit, index) => (
            <Reveal key={index} className="flex items-start gap-4">
             <div className="flex-shrink-0 mt-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
<path d="M11.2842 24C11.2804 24 11.276 24 11.2723 24C11.1173 23.9969 10.971 23.9306 10.866 23.8169L0.150017 12.1646C-0.0337288 11.9646 -0.0506034 11.6634 0.110018 11.444C0.27064 11.2253 0.563134 11.1503 0.809379 11.2653L10.6173 15.8577C10.6998 15.8964 10.7973 15.8777 10.8604 15.812L25.8214 0.175495C26.0239 -0.0363759 26.3551 -0.0595005 26.5851 0.122996C26.8151 0.305492 26.8682 0.632985 26.7076 0.878605L11.8254 23.6769C11.8042 23.71 11.7792 23.74 11.7517 23.7681L11.686 23.8338C11.5792 23.94 11.4342 24 11.2842 24Z" fill="#519B98"/>
</svg>
             </div>
              <div>
                <h3 className="text-[22px] sm:text-[24px] font-serif text-navy font-medium mb-2.5">
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

