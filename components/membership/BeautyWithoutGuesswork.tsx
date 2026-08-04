import Image from 'next/image';

import Reveal from '@/components/ui/Reveal';

export default function BeautyWithoutGuesswork() {
  return (
    <section className="section bg-[#F7F8F2]">
      <div className="shell">
        <Reveal className="mx-auto mb-16 text-center">
          <h2 className="display-2 sm:text-[42px] mb-6 text-navy">Beauty Without The Guesswork</h2>
          <p className="text-[17px] leading-[1.75] text-navy sm:text-[19px] sm:leading-[1.8]">
            Our membership program replaces the &ldquo;what should I do next?&rdquo; with a structured, results-driven plan&mdash;making aesthetic care more affordable, accessible, consistent, and rewarding every month.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[20px] bg-white shadow-sm">
            <div className="flex flex-col md:flex-row">
              {/* Text Side */}
              <div className="order-2 flex w-full flex-col justify-center px-8 py-12 md:order-1 md:w-1/2 md:p-14 lg:p-16">
                <div className="text-left">
                  <p className="eyebrow mb-4 text-navy">WHY MEMBERSHIP</p>
                  <h3 className="display-3 mb-6  sm:text-[42px]">Consistency That Delivers Results</h3>
                  <p className="mb-8 text-[15px] leading-[1.75] text-muted">
                    Consistency is the key to real, lasting results. With monthly credits, exclusive pricing, and built-in perks, your treatments become part of a seamless routine&mdash;not a one-time decision.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    'Monthly credits that roll forward (never wasted)',
                    'Members-only pricing on top treatments',
                    'Flexible, predictable monthly cost',
                    'Access to a wide range of services',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                     <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
<path d="M11.2842 24C11.2804 24 11.276 24 11.2723 24C11.1173 23.9969 10.971 23.9306 10.866 23.8169L0.150017 12.1646C-0.0337288 11.9646 -0.0506034 11.6634 0.110018 11.444C0.27064 11.2253 0.563134 11.1503 0.809379 11.2653L10.6173 15.8577C10.6998 15.8964 10.7973 15.8777 10.8604 15.812L25.8214 0.175495C26.0239 -0.0363759 26.3551 -0.0595005 26.5851 0.122996C26.8151 0.305492 26.8682 0.632985 26.7076 0.878605L11.8254 23.6769C11.8042 23.71 11.7792 23.74 11.7517 23.7681L11.686 23.8338C11.5792 23.94 11.4342 24 11.2842 24Z" fill="#519B98"/>
</svg>
                      <span className="text-[15px] leading-[1.6] text-navy">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image Side */}
              <div className="relative order-1 h-[350px] w-full md:order-2 md:h-auto md:min-h-[500px] md:w-1/2">
                <Image
                  src="/images/photo-content-13-img.jpg"
                  alt="Close-up of skin care"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
