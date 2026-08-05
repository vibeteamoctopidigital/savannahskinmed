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
      className={`flex h-full flex-col items-center rounded-[20px] bg-white p-6 text-center transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl sm:p-8 md:items-start md:p-9 md:text-left ${className}`}
    >
     <svg xmlns="http://www.w3.org/2000/svg" width="46" height="31" viewBox="0 0 46 31" fill="none"><path d="M45.3998 22.8944C45.3998 25.1366 44.5478 27.0648 42.8437 28.6792C41.2294 30.2039 39.2114 30.9662 36.7899 30.9662C33.4715 30.9662 30.6912 29.8003 28.4491 27.4684C26.2966 25.1366 25.2204 22.1321 25.2204 18.455C25.2204 11.7285 27.8213 6.93031 33.0231 4.06036C36.7899 1.99758 39.8392 0.966187 42.1711 0.966187C43.1576 0.966187 43.6509 1.32493 43.6509 2.04242C43.6509 2.67022 43.1128 3.11865 42.0365 3.38771C34.5926 5.36081 30.8706 9.08278 30.8706 14.5536C30.8706 16.9752 31.4984 19.0379 32.754 20.742C32.9334 17.6926 34.8617 16.168 38.5388 16.168C40.5119 16.168 42.1262 16.8406 43.3818 18.1859C44.7271 19.4415 45.3998 21.011 45.3998 22.8944ZM20.6464 22.8944C20.6464 25.1366 19.7944 27.0648 18.0904 28.6792C16.476 30.2039 14.5029 30.9662 12.1711 30.9662C8.763 30.9662 5.98273 29.8003 3.83026 27.4684C1.6778 25.0469 0.601562 21.9976 0.601562 18.3204C0.601562 11.6837 3.20246 6.93031 8.40425 4.06036C12.1711 1.99758 15.1756 0.966187 17.4177 0.966187C18.4043 0.966187 18.8975 1.32493 18.8975 2.04242C18.8975 2.67022 18.3594 3.11865 17.2832 3.38771C9.92892 5.36081 6.25179 9.12762 6.25179 14.6882C6.25179 17.02 6.87959 19.0379 8.1352 20.742C8.31457 17.6926 10.198 16.168 13.7854 16.168C15.7585 16.168 17.3729 16.8406 18.6285 18.1859C19.9738 19.4415 20.6464 21.011 20.6464 22.8944Z" fill="#519B98"></path></svg>

      <p className="mt-5 flex-1 text-[14px] leading-[1.6] text-[#111214] md:mt-5">
        {quote}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8 md:mt-7 md:flex-row md:items-center md:gap-3.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white shadow-md sm:h-11 sm:w-11 md:h-9 md:w-9">
          <GoogleGlyph className="h-[18px] w-[18px] sm:h-[30px] sm:w-[30px] md:h-[35px] md:w-[35px] " />
        </span>
        <div>
          <p className="font-sans text-[16px] font-bold text-ink">
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

export default function Testimonials({width,imageUrl}:{width?:string,imageUrl?:string}) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (i: number) => {
    if (!scrollRef.current) return;
    const childWidth = (scrollRef.current.children[0] as HTMLElement)?.offsetWidth || 0;
    const gap = 24; // gap-6
    scrollRef.current.scrollTo({ left: i * (childWidth + gap), behavior: 'smooth' });
  };

  useEffect(() => {
    // Autoplay disabled as per request
    /*
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
    */
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
    <section className={`${width === "full" ? "relative " : "px-4  lg:px-8"}`}>
      {/* Full-bleed photo, tinted with the panel's own rose so it reads as a
          colored band with a faint portrait watermark, not a bare photo. */}
   <div className={`${width === "full" ? "w-full px-0" : "container rounded-[20px] mb-16" } relative py-12 sm:py-14 lg:py-[104px]   overflow-hidden`}>
       <div className="absolute inset-0">
        <Image
          src= { width === "full" ?   "/testimonial-2-bg.jpg" : imageUrl ? `${imageUrl}` : "https://res.cloudinary.com/khs2rcsr/image/upload/v1785839017/testimonial-bg_cchaq8.jpg"}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-90"
          aria-hidden="true"
        />
        {/* <div className="absolute inset-0 bg-rose/80 mix-blend-multiply" aria-hidden="true" />
        <div className="absolute inset-0 bg-rose/25" aria-hidden="true" /> */}
      </div>

      <div className="shell-wide relative z-10 px-4 sm:px-6 lg:px-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start flex-col gap-2 sm:gap-3 lg:gap-2">
              <p className="mb-3 font-sans text-[14px] uppercase tracking-[2.8px] text-white sm:mb-4">
                Patient Testimonials
              </p>
              <h2 className="font-serif font-medium text-[36px] leading-[1.1] sm:text-[48px] text-white text-shadow-hero [text-wrap:initial]">
                Real Results, True Confidence
              </h2>
              <p className="mt-4 text-[16px] leading-[1.5] text-white sm:mt-5">
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
   </div>
    </section>
  );
}