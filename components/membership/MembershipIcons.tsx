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
