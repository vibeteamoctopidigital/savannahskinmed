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

function ReviewCard({ name, quote, className = '' }: (typeof reviews)[number] & { className?: string }) {
  return (
    <article
      className={`flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl sm:p-8 md:items-start md:rounded-xl md:p-9 md:text-left ${className}`}
    >
      <QuoteMark className="h-6 w-8 text-teal sm:h-8 sm:w-11 md:h-6 md:w-8" />

      <p className="mt-5 flex-1 text-[15px] leading-[1.7] text-ink sm:text-[16px] sm:leading-[1.75] md:mt-5 md:text-[13.5px] md:leading-[1.85]">
        {quote}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 md:mt-7 md:flex-row md:items-center md:gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_10px_rgba(19,40,92,0.16)] sm:h-11 sm:w-11 md:h-9 md:w-9">
          <GoogleGlyph className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] md:h-[18px] md:w-[18px]" />
        </span>
        <div>
          <p className="font-sans text-base font-semibold text-navy sm:text-[17px] md:text-[14px]">
            {name}
          </p>
          <div className="mt-1 flex justify-center gap-[2px] text-[#F5A623] sm:gap-[3px] md:mt-0.5 md:justify-start">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-3.5 md:w-3.5" />
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
    const gap = 24; // gap-6
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
    if (step === -1 && index === 0) {
      scrollTo(reviews.length - 1);
    } else if (step === 1 && scrollLeft + clientWidth >= scrollWidth - 10) {
      scrollTo(0);
    } else {
      scrollTo(index + step);
    }
  };

  return (
    <section className="relative overflow-hidden bg-rose py-12 sm:py-14 lg:py-[104px]">
      {/* Full-bleed photo, tinted with the panel's own rose so it reads as a
          colored band with a faint portrait watermark, not a bare photo. */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-rose/80 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-rose/25" aria-hidden="true" />
      </div>

      <div className="shell-wide relative z-10 px-4 sm:px-6 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start flex-col gap-2 sm:gap-3 lg:gap-2">
              <p className="eyebrow mb-3 text-white sm:mb-4">Patient Testimonials</p>
              <h2 className="display-2 text-white text-shadow-hero text-3xl sm:text-4xl lg:text-[44px] xl:text-5xl [text-wrap:initial]">
                Real Results, True Confidence
              </h2>
              <p className=" mt-4 text-[15px] leading-[1.7] text-white sm:mt-5 sm:text-[16px] sm:leading-[1.75] lg:text-[14.5px] lg:leading-[1.85]">
                Our clients love their transformations. See how we&rsquo;ve helped them look and
                feel their best.
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4 lg:gap-3">
              <button
                type="button"
                onClick={() => rotate(-1)}
                aria-label="Previous testimonial"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-rose transition-colors hover:bg-cream sm:h-[52px] sm:w-[52px] lg:h-10 lg:w-10"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
              </button>
              <button
                type="button"
                onClick={() => rotate(1)}
                aria-label="Next testimonial"
                className="grid h-11 w-11 place-items-center rounded-full bg-white text-rose transition-colors hover:bg-cream sm:h-[52px] sm:w-[52px] lg:h-10 lg:w-10"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-4 lg:w-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="mt-8 grid grid-flow-col auto-cols-[100%] gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-10 md:auto-cols-[calc(50%-12px)] lg:mt-14 lg:auto-cols-[calc(33.333333%-16px)]"
            aria-live="polite"
          >
            {reviews.map((review) => (
              <div key={review.name} className="snap-start h-full">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2 sm:mt-8">
            {reviews.map((review, i) => (
              <button
                key={review.name}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-[5px] rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-white sm:w-10' : 'w-5 bg-white/45 sm:w-6'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}