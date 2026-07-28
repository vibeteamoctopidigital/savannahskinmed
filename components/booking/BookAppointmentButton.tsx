'use client';

import { useState } from 'react';

import BookingModal from './BookingModal';
import { ArrowRight } from '@/components/icons';

type Variant = 'navy' | 'white';

const variants: Record<Variant, string> = {
  navy: 'bg-navy text-white hover:bg-navy-deep',
  white: 'bg-white text-navy hover:bg-cream',
};

type BookAppointmentButtonProps = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
};

/** "Book Appointment" CTA that opens the booking dialog instead of navigating. */
export default function BookAppointmentButton({
  children = 'Book Appointment',
  variant = 'navy',
  className = '',
}: BookAppointmentButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center justify-center gap-3 rounded-full px-10 py-[19px] font-sans text-[13px] font-medium uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        {children}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
