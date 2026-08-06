'use client';

import { useState } from 'react';

import RequestModal from './RequestModal';
import { ArrowRight } from '@/components/icons';

type Variant = 'navy' | 'white';

const variants: Record<Variant, string> = {
  navy: 'bg-navy text-white hover:bg-navy-deep',
  white: 'bg-white text-navy hover:bg-cream',
};

type RequestButtonProps = {
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  withArrow?: boolean;
};

export default function RequestButton({
  children = 'Request More Details',
  variant = 'navy',
  className = '',
  withArrow = false,
}: RequestButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>



       <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center w-[310px] h-[50px]  justify-center gap-3 rounded-full  py-[15px] font-bold font-sans text-[14px]  uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        {children}
        {/* <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /> */}

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right  transition-transform duration-300 group-hover:translate-x-1"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
      </button>

      <RequestModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
