'use client';

import { useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ChevronRight } from '@/components/icons';

export type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

type FaqAccordionProps = {
  faqs: FaqItem[];
  /** Set when the section immediately above already carries bottom spacing. */
  noTopPadding?: boolean;
};

export default function FaqAccordion({ faqs, noTopPadding = false }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`section bg-mist ${noTopPadding ? 'pt-0' : ''}`}>
   
        <Reveal>
          <h2 className="display-3 text-center text-navy text-2xl xs:text-3xl sm:text-4xl font-medium">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-8 sm:mt-12 sm:container w-[88%] rounded-[10px] sm:rounded-[32px] bg-white p-6 xs:p-8 sm:p-16 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)]">
            <div className="divide-y divide-navy/10">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-5 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-start gap-3 xs:gap-4 text-left"
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 xs:h-6 xs:w-6 shrink-0 items-center justify-center text-navy transition-transform duration-300 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      >
                        <ChevronRight className="h-3.5 w-3.5 xs:h-4 xs:w-4" />
                      </span>
                      <span className="font-serif text-[17px] xs:text-[19px] sm:text-[22px] leading-tight text-navy">
                        {faq.question}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-9 xs:pl-10 pt-3.5 xs:pt-4 text-sm xs:text-[15px] leading-relaxed xs:leading-[1.8] text-muted">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
    
    </section>
  );
}