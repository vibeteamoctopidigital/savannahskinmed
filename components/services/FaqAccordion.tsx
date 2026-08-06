'use client';

import { useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ChevronDown, ChevronRight } from '@/components/icons';

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
    <section className={`section px-4 sm:px-6 lg:px-8 ${noTopPadding ? 'pt-0' : ''}`}>

        <Reveal>
          <h2 className="sm:display-1v2 text-center text-navy text-[36px] font-medium">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <Reveal>
          <div className="mx-auto  mt-8 sm:mt-12 sm:max-w-[1255px] w-full rounded-[10px] sm:rounded-[32px] bg-white p-6 sm:p-20 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)]">
            <div className="divide-y divide-navy/10">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-8 first:pt-0 last:pb-0">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-3 sm:gap-4 text-left"
                    >
                      <span className="min-w-0 font-serif text-[19px] sm:text-[32px] leading-tight text-navy">
                        {faq.question}
                      </span>

                      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 shrink-0 text-navy transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pr-0 pt-3.5 sm:pt-4 text-sm sm:text-[16px] leading-relaxed sm:leading-[1.8] text-muted">
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