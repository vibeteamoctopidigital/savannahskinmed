'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

import Reveal from '@/components/ui/Reveal';
import { ChevronLeft, ChevronRight, GoogleGlyph, QuoteMark, StarIcon } from '@/components/icons';

const reviews = [
  {
    name: 'Rebecca G.',
    quote:
      'Thank you so much for a wonderful experience today! I have always been delighted with Rebecca’s personal approach and tailored procedures. I am excited to see the results of this photo facial. Thank you!',
  },
  {
    name: 'Sandra D.',
    quote:
      "Today was my second treatment with Becca Spacek who is the aesthetician at Savannah Age Mgt in Pooler, Ga. Again I couldn't be more pleased with the efficiency and professionalism of each treatment. Becca exudes a great deal of enthusiasm for her work and I couldn't be happier.",
  },
  {
    name: 'Lisa B.',
    quote:
      'I love coming here! I was excited to try laser hair removal for the first time and Becca was amazing! She explained the whole procedure and made sure I was comfortable the entire time. I also received a dermaplaning facial and it was top of the line! ...',
  },
  {
    name: 'Penny M.',
    quote:
      'I have had laser treatments with Becca for at least 16 years and would not go to anyone else. She is professional and very knowledgeable concerning lasers. I trust her 100%! The office is professional, clean and runs many specials.',
  },
  {
    name: 'Leigh Ann E.',
    quote:
      "Rebecca is the best! She has helped me with my skincare regimen-amazing results! I've tried just about every cream, lotion, and potion. Nothing compares-Go see her! You'll love the results",
  },
];

/** Stacked and centred on phones, left-aligned from md up. */
function ReviewCard({ name, quote, className = '' }: (typeof reviews)[number] & { className?: string }) {
  return (
    <article
      className={`flex h-full flex-col items-center rounded-2xl bg-white p-8 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl md:items-start md:rounded-xl md:p-9 md:text-left ${className}`}
    >
      <QuoteMark className="h-8 w-11 text-teal md:h-6 md:w-8" />

      <p className="mt-6 flex-1 text-[16px] leading-[1.75] text-muted md:mt-5 md:text-[13.5px] md:leading-[1.85]">
        {quote}
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 md:mt-7 md:flex-row md:items-center md:gap-3.5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_10px_rgba(19,40,92,0.16)] md:h-9 md:w-9">
          <GoogleGlyph className="h-[22px] w-[22px] md:h-[18px] md:w-[18px]" />
        </span>
        <div>
          <p className="font-sans text-[17px] font-semibold text-navy md:text-[14px]">{name}</p>
          <div className="mt-1 flex justify-center gap-[3px] text-[#F5A623] md:mt-0.5 md:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-[18px] w-[18px] md:h-3.5 md:w-3.5" />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    if (!scrollRef.current) return;
    const childWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 0;
    const gap = 24; // gap-6 is 24px
    scrollRef.current.scrollTo({ left: i * (childWidth + gap), behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollTo(0);
      } else {
        scrollTo(index + 1);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [index]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const childWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 0;
    const gap = 24;
    if (childWidth > 0) {
      const newIndex = Math.round(scrollRef.current.scrollLeft / (childWidth + gap));
      setIndex(newIndex);
    }
  };

  const rotate = (step: number) => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Check boundaries
    if (step === -1 && index === 0) {
      // jump to end
      scrollTo(reviews.length - 1);
    } else if (step === 1 && scrollLeft + clientWidth >= scrollWidth - 10) {
      // jump to start
      scrollTo(0);
    } else {
      scrollTo(index + step);
    }
  };

  return (
    <section className="pb-16 sm:pb-20 lg:pb-[104px]">
      <div className="shell-wide">
        <div className="relative overflow-hidden rounded-[26px] bg-rose px-6 py-14 sm:px-10 lg:px-16 lg:py-[104px]">
          {/* The site's own rose panel artwork — a faint helix watermark */}
          <Image
            src="/images/contact-bg.jpg"
            alt=""
            fill
            sizes="(max-width: 1760px) 100vw, 1700px"
            className="object-cover"
            aria-hidden="true"
          />

          <Reveal className="relative z-10">
            {/* Centred stack on phones; heading left with arrows right from lg. */}
            <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
              <div className="lg:max-w-[660px]">
                <p className="eyebrow mb-4 text-white/85">Patient Testimonials</p>
                <h2 className="display-2 text-white [text-wrap:initial]">
                  Real Results, True Confidence
                </h2>
                <p className="mx-auto mt-5 max-w-[420px] text-[16px] leading-[1.75] text-white/90 lg:mx-0 lg:text-[14.5px] lg:leading-[1.85]">
                  Our clients love their transformations. See how we&rsquo;ve helped them look and
                  feel their best.
                </p>
              </div>

              <div className="flex gap-4 lg:gap-3">
                <button
                  type="button"
                  onClick={() => rotate(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-[52px] w-[52px] place-items-center rounded-full bg-white text-rose transition-colors hover:bg-cream lg:h-10 lg:w-10"
                >
                  <ChevronLeft className="h-5 w-5 lg:h-4 lg:w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => rotate(1)}
                  aria-label="Next testimonial"
                  className="grid h-[52px] w-[52px] place-items-center rounded-full bg-white text-rose transition-colors hover:bg-cream lg:h-10 lg:w-10"
                >
                  <ChevronRight className="h-5 w-5 lg:h-4 lg:w-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="mt-10 grid grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-12px)] lg:auto-cols-[calc(33.333333%-16px)] gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:mt-14"
              aria-live="polite"
            >
              {reviews.map((review) => (
                <div key={review.name} className="snap-start h-full">
                  <ReviewCard {...review} />
                </div>
              ))}
            </div>

            {/* Progress dots */}
            <div className="mt-8 flex justify-center gap-2">
              {reviews.map((review, i) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className={`h-[5px] rounded-full transition-all duration-300 ${
                    i === index ? 'w-10 bg-white' : 'w-6 bg-white/45'
                  }`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
