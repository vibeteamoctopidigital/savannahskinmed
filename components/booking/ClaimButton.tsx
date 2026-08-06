'use client';

import { useState } from 'react';

import ClaimModal from './ClaimModal';
import { ArrowRight } from '@/components/icons';

type Variant = 'navy' | 'white';

const variants: Record<Variant, string> = {
  navy: 'bg-navy text-white hover:bg-navy-deep',
  white: 'bg-white text-navy hover:bg-cream',
};

type ClaimButtonProps = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
  /** Which special is being claimed, so the submission records it. */
  offerId?: string;
  offerLabel?: string;
};

export default function ClaimButton({
  children = 'Claim',
  variant = 'navy',
  className = '',
  withArrow = false,
  offerId,
  offerLabel,
}: ClaimButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center justify-center gap-3 rounded-full px-10 py-[19px] font-sans text-[14px] font-bold uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        {children}
        {withArrow && (
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right  transition-transform duration-300 group-hover:translate-x-1"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
        )}
      </button>

      <ClaimModal
        open={open}
        onClose={() => setOpen(false)}
        offerId={offerId}
        offerLabel={offerLabel}
      />
    </>
  );
}
