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
        className={`group inline-flex items-center justify-center gap-3 rounded-full px-10 py-[19px] font-sans text-[13px] font-medium uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        {children}
        {withArrow && (
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
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
