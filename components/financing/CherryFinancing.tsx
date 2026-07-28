'use client';

import { useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import { StarIcon, ChevronDown } from '@/components/icons';

// Only withcherry.com itself and the sub-paths spelled out in Cherry's own
// fine print below are used as link targets — no merchant-specific or
// guessed URLs, since those can't be verified to exist.
const CHERRY_HOME = 'https://withcherry.com';

const highlights = [
  'No hard credit checks, ever',
  'True 0% APR options available',
  <>
    Interest-bearing plans with APRs as low as <strong className="font-bold">5.99%</strong>
  </>,
  'Up to $50,000 approvals',
  'No hidden fees',
];

const steps = [
  {
    title: 'See if you qualify',
    description: 'It only takes 60 seconds to complete the application',
  },
  {
    title: 'Get care',
    description: 'Use your approval to pay for your treatment',
  },
  {
    title: 'Pay over time',
    description: 'Choose a plan length that fits your needs with 0% APR options',
  },
];

const testimonials = [
  {
    name: 'Bryana',
    quote:
      "I was worried the application would take long, I would have paid on my credit card – but it only took a few minutes and I'm so happy I can split my payments up now!",
  },
  {
    name: 'Alex',
    quote:
      "Cherry was really easy to use and super fast. I can't wait to go back and try different services now that I can split my payments!",
  },
  {
    name: 'Marie',
    quote: 'I used this on Monday and it was great. Low down payment and low monthly. You all should try it.',
  },
  {
    name: 'Gabriel',
    quote:
      "Cherry was great, one of the better lending companies I've ever used. Making payments was a lot easier and I appreciate that Cherry was willing to work with me.",
  },
  {
    name: 'Alyssa',
    quote: 'Cherry is amazing!!! Now we can get everything done!!',
  },
  {
    name: 'Cassie',
    quote: "I've been putting off these treatments for a long time. I scheduled them all today using Cherry!",
  },
];

const faqs: { question: string; answer: React.ReactNode }[] = [
  {
    question: 'How long is my approval valid for?',
    answer: 'Approvals are valid for days. Once that time period expires, you are welcome to reapply.',
  },
  {
    question: 'Can I increase my approval amount?',
    answer: (
      <>
        If you are eligible for an increase, you may request this through the{' '}
        <a
          href={CHERRY_HOME}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[#0f8f63] underline underline-offset-2"
        >
          Cherry Consumer Portal
        </a>
        . Increased approval amount and decision are subject to eligibility. If you do not see the
        button to &ldquo;request an increase,&rdquo; it means you are ineligible for an increase
        at this time.
      </>
    ),
  },
  {
    question: 'Can I pay this off early?',
    answer:
      "Yes, Cherry does not have any prepayment penalties. If you have interest and pay off early, you'll even avoid some of that interest.",
  },
  {
    question: 'Does my 0% APR offer expire?',
    answer:
      "No, if you're eligible for a 0% APR offer, it doesn't expire for the current approval. For example: If you were approved for a 6 month term with 0% APR, this promotion is valid until the end of term as long as you stay current with your payments.",
  },
  {
    question: 'How much is my down payment and when is it due?',
    answer: (
      <>
        <p>
          Once you input your purchase price, you&rsquo;ll be provided with the options you have
          for down payment. It is due when the provider confirms they will need the funds in
          order to move forward with your services. Remember to bring your bank issued debit or
          credit card* when you are ready for checkout.
        </p>
        <p className="mt-3">
          *Making payments via <em>Credit Card</em> will result in a 2.99% processing fee. There
          is no processing fee for making a down payment with a traditional bank-issued Debit
          Card.
        </p>
      </>
    ),
  },
  {
    question: 'How are refunds handled?',
    answer: (
      <>
        <p>
          To request a refund, please contact Savannah Age Management Medicine LLC directly.
        </p>
        <p className="mt-3">
          We defer to the refund policies put in place by Savannah Age Management Medicine LLC
          and cannot initiate a refund without their approval.
        </p>
        <p className="mt-3">
          Once Savannah Age Management Medicine LLC authorizes a refund we will deposit the
          refunded amount (full or partial) into your account. Your Cherry account status and
          loan balance are adjusted accordingly.
        </p>
        <p className="mt-3">
          If a partial refund is issued, your loan amount will be adjusted to reflect your new
          remaining balance. If a refund is issued in full, any payments made on your loan will be
          returned to you.
        </p>
      </>
    ),
  },
  {
    question: 'Does Cherry report to the credit bureaus?',
    answer:
      "Yes, Cherry may report the status of our borrowers' accounts to Equifax, one of the major credit bureaus.",
  },
  {
    question: 'Can missing payments on my account with Cherry hurt my credit?',
    answer:
      'Cherry is required to report all payment history to the credit bureaus. This means we may also report late payments, missed payments, or other delinquencies on your account to the credit bureaus.',
  },
];

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 10.5l3.5 3.5L16 5.5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CherryFinancing() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Reveal className="mx-auto max-w-[720px]">
      <div className="rounded-2xl border border-[#d6efe3] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.12)] sm:p-9">
        {/* Brand row */}
        <div className="mb-5 flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0f8f63] text-white">
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span className="font-sans text-[15px] font-bold text-[#0f8f63]">Cherry</span>
        </div>

        <h2 className="font-serif text-[30px] leading-tight text-navy">Treat now, pay later</h2>

        <ul className="mt-6 space-y-3">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] text-navy">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0f8f63]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-3">
          <a
            href={CHERRY_HOME}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full bg-[#0f8f63] px-8 py-3 text-center text-[14px] font-semibold text-white transition-colors hover:bg-[#0c7852]"
          >
            See if you qualify
          </a>
          <a
            href={CHERRY_HOME}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-full border border-[#0f8f63] px-8 py-3 text-center text-[14px] font-semibold text-[#0f8f63] transition-colors hover:bg-[#e8f7f1]"
          >
            Manage your account
          </a>
        </div>

        {/* Example payment */}
        <div className="mt-10 border-t border-navy/10 pt-8">
          <h3 className="font-sans text-[16px] font-bold text-navy">
            See an example of what you could pay
          </h3>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-[#d6efe3] bg-[#f5fbf8] px-4 py-3">
            <span className="font-sans text-[15px] font-semibold text-navy">$1,800</span>
            <span className="text-[12px] uppercase tracking-wide text-muted">
              example payments for
            </span>
          </div>

          <a
            href={CHERRY_HOME}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-4 block rounded-full bg-[#0f8f63] px-8 py-3 text-center text-[14px] font-semibold text-white transition-colors hover:bg-[#0c7852]"
          >
            Get personalized options
          </a>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-navy">
            <span className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-[#0f8f63]" /> No hard credit checks, ever
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-[#0f8f63]" /> 60 seconds to apply
            </span>
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-muted">
            0% APR and other promotional rates subject to eligibility. See footer for details.
          </p>
        </div>

        {/* How it works */}
        <div className="mt-10 border-t border-navy/10 pt-8">
          <h3 className="font-sans text-[16px] font-bold text-navy">How Cherry works</h3>
          <div className="mt-5 space-y-5">
            {steps.map((step) => (
              <div key={step.title} className="flex items-start gap-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0f8f63]" />
                <div>
                  <p className="font-sans text-[14px] font-semibold text-navy">{step.title}</p>
                  <p className="text-[13px] text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-10 border-t border-navy/10 pt-8">
          <h3 className="font-sans text-[16px] font-bold text-navy">What Our Customers Say</h3>
          <div className="mt-5 -mx-1 flex gap-3 overflow-x-auto pb-2">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="w-[230px] shrink-0 rounded-xl border border-navy/10 bg-white p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e8f7f1] font-sans text-[13px] font-bold text-[#0f8f63]">
                    {t.name.charAt(0)}
                  </span>
                  <span className="font-sans text-[13px] font-semibold text-navy">{t.name}</span>
                </div>
                <div className="mt-2 flex gap-0.5 text-[#0f8f63]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 border-t border-navy/10 pt-8">
          <h3 className="font-sans text-[16px] font-bold text-navy">Questions?</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            What is Cherry? <span className="text-[#0f8f63]">Cherry</span> is a buy now, pay later
            company making it fast and easy to pay for health and wellness purchases over time.
          </p>

          <div className="mt-5 space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={faq.question} className="rounded-lg border border-[#d6efe3]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
                  >
                    <span className="font-sans text-[14px] text-navy">{faq.question}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-[#0f8f63] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-[13px] leading-relaxed text-muted">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              className="rounded-full border border-[#d6efe3] px-6 py-2.5 text-center text-[13px] font-medium text-[#0f8f63] transition-colors hover:bg-[#e8f7f1]"
            >
              Hide all FAQs
            </button>
            <a
              href={CHERRY_HOME}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-[#d6efe3] px-6 py-2.5 text-center text-[13px] font-medium text-[#0f8f63] transition-colors hover:bg-[#e8f7f1]"
            >
              Visit help center
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 space-y-3 border-t border-navy/10 pt-6 text-[11px] leading-relaxed text-muted">
          <p>
            These are examples only. 0% APR and other promotional rates subject to eligibility.
            Exact terms and APR depend on credit score and other factors. For example, a $400
            payment plan with Cherry may cost $100/month over 3 months at 0% APR with down payment
            in the amount of monthly payment due at the time of purchase. Not every provider that
            uses Cherry will offer the payment plan terms listed above.
          </p>
          <p>
            Payment options through Cherry Technologies, Inc. are issued by the following lending
            partners:{' '}
            <a
              href={`${CHERRY_HOME}/lending-partners`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#0f8f63] underline underline-offset-2"
            >
              withcherry.com/lending-partners
            </a>
            . See{' '}
            <a
              href={`${CHERRY_HOME}/terms`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#0f8f63] underline underline-offset-2"
            >
              withcherry.com/terms
            </a>{' '}
            for details. Iowa only: Borrowers are subject to Iowa state specific underwriting
            criteria. APR for all Iowa borrowers is capped at 20.99%.
          </p>
          <p>
            Cherry is committed to making our product accessible. For our accessibility statement
            and feedback form, see{' '}
            <a
              href={`${CHERRY_HOME}/accessibility`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#0f8f63] underline underline-offset-2"
            >
              withcherry.com/accessibility
            </a>
            .
          </p>
          <p>
            Copyright &copy; 2020-{new Date().getFullYear()} Cherry Technologies Inc. NMLS
            #2061234, 2 Embarcadero Center, 8th Floor, San Francisco, CA 94111.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
