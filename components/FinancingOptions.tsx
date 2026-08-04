"use client"
import React, { useState } from "react";
import TextHero from "./TextHero";
import TestimonialsCarousel from "./TestimunialCarusal";

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 flex-shrink-0 mt-0.5">
    <path
      d="M4 10.5L8 14.5L16 5.5"
      stroke="#059669"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    className="w-4 h-4 inline-block"
    fill={filled ? "#059669" : "none"}
    stroke={filled ? "#059669" : "#059669"}
    strokeWidth="1"
  >
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.8L10 14.9l-5.2 2.62.99-5.8-4.21-4.1 5.82-.85L10 1.5z" />
  </svg>
);

const testimonials = [
  {
    name: "Bryana",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/1.png",
    text: "I was worried the application would take long, I would have paid on my credit card – but it only took a few minutes and I'm so happy I can split my payments up now!",
  },
  {
    name: "Alex",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/2.png",
    text: "Cherry was really easy to use and super fast. I can't wait to go back and try different services now that I can split my payments!",
  },
  {
    name: "Marie",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/3.png",
    text: "I used this on Monday and it was great. Low down payment and low monthly. You all should try it.",
  },
  {
    name: "Gabriel",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/6.png",
    text: "Cherry was great, one of the better lending companies I've ever used. Making payments was a lot easier and I appreciate that Cherry was willing to work with me.",
  },
  {
    name: "Alyssa",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/5.png",
    text: "Cherry is amazing!!! Now we can get everything done!!",
  },
  {
    name: "Cassie",
    rating: 5,
    avatar:
      "https://master-cherry-storage.s3.us-west-2.amazonaws.com/static/widgets/images/4.png",
    text: "I've been putting off these treatments for a long time. I scheduled them all today using Cherry!",
  },
];

export default function FinancingOptions() {
  const [amount, setAmount] = useState("1,900");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
 
 <TextHero
 
 title="Financing Options"
 />

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Left: image (hidden on mobile) */}
          <div className="hidden md:block md:w-[300px] flex-shrink-0">
            <div
              className="rounded-2xl overflow-hidden w-full aspect-square md:aspect-auto md:h-[280px]"
              style={{ backgroundColor: "#8FA9BD" }}
            >
              <img
                src="https://files.withcherry.com/widgets/images/dental/12.webp"
                alt="Smiling person with arms crossed"
                className="w-full h-full object-cover"
              />

             
            </div>
          </div>

          {/* Right: Cherry card */}
          <div className="flex-1 border border-gray-200 rounded-lg p-6 sm:p-8">
            {/* Cherry brand row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-xs">
                  %
                </div>
                <span className="font-semibold text-gray-900">Cherry</span>
              </div>
              <button
                aria-label="Language"
                className="w-8 h-8 rounded-md border flex items-center justify-center text-xs"
                style={{ borderColor: "#059669", color: "#059669" }}
              >
                文A
              </button>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Treat now, pay later
            </h2>

            {/* Feature list */}
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>
                  <strong>No hard credit checks</strong>, ever
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>
                  <strong>True 0% APR</strong> options available
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>
                  Interest-bearing plans with APRs <strong>as low as 5.99%</strong>
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>
                  Up to <strong>$50,000</strong> approvals
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>
                  <strong>No hidden fees</strong>
                </span>
              </li>
            </ul>

            {/* Buttons */}
            <button
              className="w-full text-white font-semibold rounded-md py-3 mb-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#059669" }}
            >
              See if you qualify
            </button>
            <button
              className="w-full font-semibold rounded-md py-3 mb-8 border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#059669", color: "#059669" }}
            >
              Manage your account
            </button>

            {/* Example payments */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              See an example of what you could pay
            </h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-600 mb-1">
                Example payments for
              </label>
              <div className="relative w-40">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  $
                </span>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-400 rounded-full py-2 pl-6 pr-3 text-sm focus:outline-none focus:ring-2"
                  style={{ boxShadow: "none" }}
                />
              </div>
            </div>

            <button
              className="w-full text-white font-semibold rounded-md py-3 mb-4 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#059669" }}
            >
              Get personalized options
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>No hard credit checks, ever</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <CheckIcon />
                <span>60 seconds to apply</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-8">
              0% APR and other promotional rates subject to eligibility. See footer for details.
            </p>

            {/* How Cherry works */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              How Cherry works
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ border: "2px solid #059669" }}
                >
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
                    <path
                      d="M4 10.5L8 14.5L16 5.5"
                      stroke="#059669"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#059669" }}>
                    See if you qualify
                  </p>
                  <p className="text-sm text-gray-700">
                    It only takes 60 seconds to complete the application
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ border: "2px solid #059669" }}
                >
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
                    <path
                      d="M10 17s-6-4.35-6-8.5A3.5 3.5 0 0110 6a3.5 3.5 0 016 2.5C16 12.65 10 17 10 17z"
                      stroke="#059669"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#059669" }}>
                    Get care
                  </p>
                  <p className="text-sm text-gray-700">
                    Use your approval to pay for your treatment
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ border: "2px solid #059669" }}
                >
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none">
                    <circle cx="10" cy="10" r="7" stroke="#059669" strokeWidth="1.5" />
                    <path
                      d="M10 6v4l3 2"
                      stroke="#059669"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#059669" }}>
                    Pay over time
                  </p>
                  <p className="text-sm text-gray-700">
                    Choose a plan length that fits your needs with 0% APR options
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            {/* <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h3>

            <div
              className="flex gap-4 mb-8 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              tabIndex={0}
            >
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="border border-gray-200 rounded-lg p-4 flex-shrink-0 snap-start w-[78%] xs:w-[70%] sm:w-[45%] lg:w-[31%]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={t.avatar}
                      alt={`profile picture of ${t.name}`}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="font-semibold text-sm text-gray-900">
                      {t.name}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} filled={i < t.rating} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              ))}
            </div> */}
            <TestimonialsCarousel testimonials={testimonials}/>

            {/* Questions */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              Questions?
            </h3>
            <p className="text-sm text-gray-800 mb-6">
              What is Cherry?{" "}
              <a href="#" className="text-blue-600 underline">
                Cherry
              </a>{" "}
              is a buy now, pay later company making it fast and easy to pay
              for health and wellness purchases over time.
            </p>

            <button
              className="w-full font-semibold rounded-md py-3 mb-3 border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#059669", color: "#059669" }}
            >
              View all FAQs
            </button>
            <button
              className="w-full font-semibold rounded-md py-3 mb-8 border transition-colors hover:bg-gray-50"
              style={{ borderColor: "#059669", color: "#059669" }}
            >
              Visit help center
            </button>

            {/* Fine print */}
            <div className="text-xs text-gray-500 space-y-3 leading-relaxed border-t border-gray-200 pt-6">
              <p>
                These are examples only. 0% APR and other promotional rates
                subject to eligibility. Exact terms and APR depend on credit
                score and other factors. For example, a $400 payment plan
                with Cherry may cost $100/month over 3 months at 0% APR with
                down payment in the amount of monthly payment due at the time
                of purchase. Not every provider that uses Cherry will offer
                the payment plan terms listed above.
              </p>
              <p>
                Payment options through Cherry Technologies, Inc. are issued
                by the following lending partners:{" "}
                <a href="#" className="text-blue-600 underline">
                  withcherry.com/lending-partners
                </a>
                . See{" "}
                <a href="#" className="text-blue-600 underline">
                  withcherry.com/terms
                </a>{" "}
                for details. Iowa only: Borrowers are subject to Iowa state
                specific underwriting criteria. APR for all Iowa borrowers is
                capped at 20.99%.
              </p>
              <p>
                Cherry is committed to making our product accessible. For our
                accessibility statement and feedback form, see{" "}
                <a href="#" className="text-blue-600 underline">
                  withcherry.com/accessibility
                </a>
                .
              </p>
              <p>
                Copyright &copy; 2020-2026 Cherry Technologies Inc. NMLS
                #2061234, 2 Embarcadero Center, 8th Floor, San Francisco, CA
                94111.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}