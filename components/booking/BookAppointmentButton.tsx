// 'use client';

// import { useState } from 'react';

// import BookingModal from './BookingModal';
// import { ArrowRight } from '@/components/icons';

// type Variant = 'navy' | 'white';

// const variants: Record<Variant, string> = {
//   navy: 'bg-navy text-white hover:bg-navy-deep',
//   white: 'bg-white text-navy hover:bg-cream',
// };

// type BookAppointmentButtonProps = {
//   children?: React.ReactNode;
//   variant?: Variant;
//   className?: string;
// };

// /** "Book Appointment" CTA that opens the booking dialog instead of navigating. */
// export default function BookAppointmentButton({
//   children = 'Book Appointment',
//   variant = 'navy',
//   className = '',
// }: BookAppointmentButtonProps) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className={`group inline-flex items-center w-[273px] h-[50px]  justify-center gap-3 rounded-full  py-[15px] font-bold font-sans text-[14px]  uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
//       >
//         {children}
//         {/* <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /> */}

//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right  transition-transform duration-300 group-hover:translate-x-1"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
//       </button>

//       <BookingModal open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// }
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
        className={`group inline-flex items-center w-full max-w-[273px] sm:w-[273px] min-h-[50px] justify-center gap-3 rounded-full px-6 py-[15px] font-bold font-sans text-[14px] uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
      >
        <span className="text-center leading-snug">{children}</span>
        {/* <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" /> */}

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-right-icon lucide-move-right shrink-0 transition-transform duration-300 group-hover:translate-x-1"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
      </button>

      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}