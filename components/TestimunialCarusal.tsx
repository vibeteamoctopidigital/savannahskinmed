//@ts-ignore

import React, { useState, useRef, useEffect, useCallback } from 'react';

const TestimonialsCarousel = ({ testimonials }:{testimonials:any}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const autoPlayRef = useRef<any>(null);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef<any>(null);

  const totalSlides = testimonials.length;

  // ─── Navigation ──────────────────────────────────────────────
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index:any) => {
    setCurrentIndex(index);
  }, []);

  // ─── Auto‑play ────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(goToNext, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, goToNext]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // ─── Scroll to current slide ────────────────────────────────
  useEffect(() => {
    const container = containerRef.current as any
    if (!container) return;

    const slide = container.querySelector('.testimonial-slide');
    if (!slide) return;

    const slideWidth = slide.getBoundingClientRect().width;
    const gap = 16; // gap-4
    const scrollPosition = (slideWidth + gap) * currentIndex;

    isProgrammaticScroll.current = true;
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    // Clear the flag after the scroll completes (or after a delay)
    clearTimeout(scrollTimeout.current as any);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 400); // matches smooth scroll duration
  }, [currentIndex]);

  // ─── Handle scroll events (sync index) ─────────────────────
  const handleScroll = useCallback(() => {
    // Ignore if programmatic scroll or still dragging
    if (isProgrammaticScroll.current) return;

    const container = containerRef.current as any
    if (!container) return;

    const slide = container.querySelector('.testimonial-slide');
    if (!slide) return;

    const slideWidth = slide.getBoundingClientRect().width;
    const gap = 16;
    const step = slideWidth + gap;
    const newIndex = Math.round(container.scrollLeft / step);

    // Clamp and update only if changed
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
      setCurrentIndex(newIndex);
    }
  }, [currentIndex, totalSlides]);

  // ─── Drag (mouse + touch) ──────────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const startDrag = (clientX:any) => {
    const container = containerRef.current as any;
    if (!container) return;
    setIsDragging(true);
    setIsPaused(true);
    const rect = container.getBoundingClientRect();
    setDragStartX(clientX - rect.left);
    setScrollStart(container.scrollLeft);
  };

  const moveDrag = (clientX:any) => {
    if (!isDragging) return;
    const container = containerRef.current as any ;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const walk = (x - dragStartX) * 1.2;
    container.scrollLeft = scrollStart - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    setIsPaused(false);
    // After drag, snap to the nearest slide via scroll event (will be handled)
  };

  // Mouse
  const onMouseDown = (e:any) => startDrag(e.clientX);
  const onMouseMove = (e:any) => moveDrag(e.clientX);
  const onMouseUp = endDrag;
  const onMouseLeaveContainer = () => {
    if (isDragging) endDrag();
    setIsPaused(false);
  };

  // Touch
  const onTouchStart = (e:any) => {
    const touch = e.touches[0];
    if (touch) startDrag(touch.clientX);
  };
  const onTouchMove = (e:any) => {
    const touch = e.touches[0];
    if (touch) moveDrag(touch.clientX);
  };
  const onTouchEnd = endDrag;

  // ─── Render ──────────────────────────────────────────────────
  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-4 mb-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeaveContainer}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave as any}
        tabIndex={0}
        role="region"
        aria-label="Testimonials carousel"
      >
        {testimonials.map((t:any) => (
          <div
            key={t.name}
            className="testimonial-slide border border-gray-200 rounded-lg p-4 flex-shrink-0 snap-start w-[78%] xs:w-[70%] sm:w-[45%] lg:w-[31%] bg-white shadow-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <img
                src={t.avatar}
                alt={t.name}
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
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-2">
        {testimonials.map((_:any, index:number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 z-10 md:left-0 md:-translate-x-4"
        aria-label="Previous"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg border border-gray-200 z-10 md:right-0 md:translate-x-4"
        aria-label="Next"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-3 h-3 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default TestimonialsCarousel;