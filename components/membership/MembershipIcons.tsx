import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function BadgeDollarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" {...stroke} />
      <path d="M12 8v8M10 10h4M10 14h4" {...stroke} />
      <circle cx="12" cy="12" r="4" {...stroke} />
    </svg>
  );
}

export function CalendarClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="4" y="5" width="16" height="16" rx="2" {...stroke} />
      <path d="M16 3v4M8 3v4M4 11h16" {...stroke} />
      <circle cx="16" cy="16" r="4" fill="white" stroke="currentColor" strokeWidth={1.5} />
      <path d="M16 14.5v1.5l1 1" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="8" width="18" height="4" rx="1" {...stroke} />
      <path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" {...stroke} />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" {...stroke} />
    </svg>
  );
}

export function BloomIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M16 27c0-6 3.4-11.5 8.6-14.4C24.2 19.9 20.9 25 16 27Z" {...stroke} />
      <path d="M16 27C16 21 12.6 15.5 7.4 12.6 7.8 19.9 11.1 25 16 27Z" {...stroke} />
      <path d="M16 27c-1.8-5.9-.9-12 2.6-16.3C21 17 20.3 22.9 16 27Z" {...stroke} />
      <path d="M16 27c1.8-5.9.9-12-2.6-16.3C11 17 11.7 22.9 16 27Z" {...stroke} />
      <path d="M16 27v2.2" {...stroke} />
    </svg>
  );
}

export function CreditsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="7.5" r="4" {...stroke} />
      <path d="M12 5v5M10.5 6.5h2a1 1 0 0 1 0 2h-1a1 1 0 0 0 0 2h2.5" {...stroke} />
      <path d="M12 11.5V21" {...stroke} />
      <path d="M12 17.5C9.5 17.5 8 15.5 8 13.5c1.5 0 3 1.5 4 4Z" {...stroke} />
      <path d="M12 17.5c2.5 0 4-2 4-4-1.5 0-3 1.5-4 4Z" {...stroke} />
    </svg>
  );
}

export function MemberPricingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="9.5" cy="9.5" r="5.5" {...stroke} />
      <circle cx="14.5" cy="14.5" r="6.5" {...stroke} />
      <path
        d="m14.5 11.5 1 2 2.2.3-1.6 1.6.4 2.2-2-1.1-2 1.1.4-2.2-1.6-1.6 2.2-.3z"
        {...stroke}
      />
    </svg>
  );
}

export function SyringeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m18 2 4 4" {...stroke} />
      <path d="m17 7 3-3" {...stroke} />
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" {...stroke} />
      <path d="m9 11 4 4" {...stroke} />
      <path d="m11 13-1.5 1.5" {...stroke} />
      <path d="m13 11-1.5 1.5" {...stroke} />
      <path d="m5 19-3 3" {...stroke} />
      <path d="m14 4 6 6" {...stroke} />
    </svg>
  );
}

export function BirthdayPerksIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="10" y="10" width="4" height="7" rx="1" {...stroke} />
      <path d="M12 9c0-1.5 1-2.5 1-4-1 1-2 2-2 3.5 0 0.5 0.5 0.5 1 0.5Z" {...stroke} />
      <path d="M16 6l.5 1.5L18 8l-1.5.5L16 10l-.5-1.5L14 8l1.5-.5Z" {...stroke} />
      <path d="M7 9l.5 1L9 10.5 7.5 11 7 12l-.5-1L5 10.5 6.5 10Z" {...stroke} />
      <path d="M8 17h8c0 2-1.5 3.5-4 3.5S8 19 8 17Z" {...stroke} />
      <path d="M6 18c0 1.5 1.5 2.5 3 2.5M18 18c0 1.5-1.5 2.5-3 2.5M6 17c0-2 1.5-3 3-3M18 17c0-2-1.5-3-3-3" {...stroke} />
    </svg>
  );
}

