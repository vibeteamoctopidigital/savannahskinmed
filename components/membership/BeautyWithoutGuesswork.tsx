import Image from 'next/image';

import Reveal from '@/components/ui/Reveal';

export default function BeautyWithoutGuesswork() {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <Reveal className="mx-auto max-w-[800px] text-center mb-16">
          <h2 className="display-2 italic mb-6">Beauty Without The Guesswork</h2>
          <p className="text-[17px] leading-[1.75] text-muted">
            Our membership program replaces the &ldquo;what should I do next?&rdquo; with a structured, results-driven plan&mdash;making aesthetic care more affordable, accessible, consistent, and rewarding every month.
          </p>
        </Reveal>

        <Reveal>
          <div className="overflow-hidden rounded-[20px] bg-white shadow-sm">
            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="relative h-[350px] w-full md:h-auto md:min-h-[500px] md:w-1/2 order-1 md:order-1">
                <Image
                  src="/images/photo-content-13-img.jpg"
                  alt="Close-up of skin care"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Text Side */}
              <div className="flex w-full flex-col justify-center px-8 py-12 md:w-1/2 md:p-14 lg:p-16 order-2 md:order-2">
                <p className="eyebrow mb-4 text-navy">WHY MEMBERSHIP</p>
                <h3 className="display-3 mb-6">Consistency That Delivers Results</h3>
                <p className="mb-8 text-[15px] leading-[1.75] text-muted">
                  Consistency is the key to real, lasting results. With monthly credits, exclusive pricing, and built-in perks, your treatments become part of a seamless routine&mdash;not a one-time decision.
                </p>

                <ul className="space-y-4">
                  {[
                    'Monthly credits that roll forward (never wasted)',
                    'Members-only pricing on top treatments',
                    'Flexible, predictable monthly cost',
                    'Access to a wide range of services',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-5 w-5 shrink-0 text-[#85a8a1]" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-[15px] leading-[1.6] text-navy">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
