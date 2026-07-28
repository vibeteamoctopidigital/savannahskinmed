'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ChevronLeft, ChevronRight } from '@/components/icons';

const AUTOPLAY_MS = 3000;

export type BeforeAfterSlide = {
  before: number;
  after: number;
  procedure: string;
};

type BeforeAfterProps = {
  title?: string;
  eyebrow?: string;
  slides?: BeforeAfterSlide[];
  labelStyle?: 'bottom' | 'pill';
};

const defaultSlides: BeforeAfterSlide[] = [
  { before: 39, after: 40, procedure: 'Dysport' },
  { before: 41, after: 42, procedure: 'Dysport' },
  { before: 43, after: 44, procedure: 'Lip Flip' },
  { before: 45, after: 46, procedure: '2 Syringes - Dermal Filler - Restylane' },
  { before: 47, after: 48, procedure: '1/2 Syringe - Dermal Filler - Versa' },
  { before: 49, after: 50, procedure: '1/2 Syringe - Dermal Filler - Versa' },
];

const src = (n: number) => `/images/before-after-${n}-img.jpg`;

export default function BeforeAfter({
  title = 'Results You Can See, Confidence You Can Feel',
  eyebrow = 'Before & After Procedures',
  slides = defaultSlides,
  labelStyle = 'bottom',
}: BeforeAfterProps) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(50);
  // Autoplay holds while the pointer rests on the slider *or* while the
  // visitor is actively dragging it — touch has no hover, so the two are
  // tracked separately and only both being false resumes playback.
  const [hovering, setHovering] = useState(false);
  const [holding, setHolding] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const paused = hovering || holding;

  const go = useCallback((step: number) => {
    setIndex((current) => (current + step + slides.length) % slides.length);
    setPos(50); // every slide opens on an even split
  }, []);

  // Advance automatically, but never while the visitor is interacting with it.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, go]);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const { left, width } = frame.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  }, []);

  const slide = slides[index];

  return (
    <section className="section bg-white pt-0 lg:pt-0">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
          />
        </Reveal>

        <div
          className="relative mx-auto mt-12 max-w-[1040px]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
        >
          {/* ---------- Comparison frame ---------- */}
          <div
            ref={frameRef}
            onPointerDown={(e) => {
              dragging.current = true;
              setHolding(true);
              e.currentTarget.setPointerCapture(e.pointerId);
              setFromClientX(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current) setFromClientX(e.clientX);
            }}
            onPointerUp={() => {
              dragging.current = false;
              setHolding(false);
            }}
            onPointerCancel={() => {
              dragging.current = false;
              setHolding(false);
            }}
            className="relative mx-auto aspect-[838/500] w-full max-w-[806px] cursor-ew-resize select-none overflow-hidden rounded-xl"
          >
            {/* Untreated state */}
            <Image
              key={`before-${slide.before}`}
              src={src(slide.before)}
              alt={`Before the ${slide.procedure} procedure`}
              fill
              priority={index === 0}
              sizes="(max-width: 860px) 100vw, 806px"
              className="object-cover"
              draggable={false}
            />

            {/* Treated state, revealed to the right of the handle */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              aria-hidden="true"
            >
              <Image
                key={`after-${slide.after}`}
                src={src(slide.after)}
                alt=""
                fill
                sizes="(max-width: 860px) 100vw, 806px"
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* Divider, drag handle and procedure label */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 -ml-px w-[2px] bg-white"
              style={{ left: `${pos}%` }}
            >
              <span className={`absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-[0_4px_16px_rgba(0,0,0,0.22)] transition-all duration-300 sm:h-[52px] sm:w-[52px] ${holding ? 'scale-95 shadow-md' : hovering ? 'scale-110 shadow-xl' : 'scale-100'}`}>
                <ChevronLeft className="-mr-[3px] h-4 w-4" />
                <ChevronRight className="-ml-[3px] h-4 w-4" />
              </span>

            </div>

            {/* Sits outside the 2px divider so its width resolves against the
                frame — short labels stay on one line, long ones wrap. */}
            <span
              className="pointer-events-none absolute bottom-[7%] z-20 flex max-w-[min(84vw,340px)] -translate-x-1/2 flex-wrap justify-center gap-x-1.5 rounded-full bg-white/85 px-5 py-2 text-center font-sans text-[10px] uppercase leading-[1.5] tracking-[0.14em]"
              style={{ left: `${pos}%` }}
            >
              <span className="text-muted">Procedure:</span>
              <span className="whitespace-nowrap font-bold text-navy">{slide.procedure}</span>
            </span>

            {labelStyle === 'bottom' ? (
              <>
                <span className="pointer-events-none absolute bottom-[6%] left-[6%] z-10 font-serif text-[22px] text-white text-shadow-hero sm:text-[30px]">
                  Before
                </span>
                <span className="pointer-events-none absolute bottom-[6%] right-[6%] z-10 font-serif text-[22px] text-white text-shadow-hero sm:text-[30px]">
                  After
                </span>
              </>
            ) : (
              <>
                <span className="pointer-events-none absolute top-4 left-1/4 z-10 -translate-x-1/2 rounded-full bg-sage px-12 py-1 font-sans text-[14px] font-bold text-white shadow-md sm:top-6 sm:px-16 sm:py-1.5 sm:text-[16px]">
                  Before
                </span>
                <span className="pointer-events-none absolute top-4 right-1/4 z-10 translate-x-1/2 rounded-full bg-rose-deep px-12 py-1 font-sans text-[14px] font-bold text-white shadow-md sm:top-6 sm:px-16 sm:py-1.5 sm:text-[16px]">
                  After
                </span>
              </>
            )}

            {/* Keyboard-accessible control for the divider */}
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(pos)}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={`Reveal the after image for ${slide.procedure}`}
              className="absolute bottom-2 left-1/2 z-30 h-8 w-[60%] -translate-x-1/2 cursor-ew-resize opacity-0"
            />
          </div>

          {/* ---------- Slide controls ---------- */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous result"
            className="absolute left-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-rose/70 text-white transition-colors hover:bg-rose md:left-0 md:h-11 md:w-11"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next result"
            className="absolute right-1 top-1/2 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-rose/70 text-white transition-colors hover:bg-rose md:right-0 md:h-11 md:w-11"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <p className="sr-only" aria-live="polite">
            {`Result ${index + 1} of ${slides.length}: ${slide.procedure}`}
          </p>
        </div>
      </div>
    </section>
  );
}
