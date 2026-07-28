import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />
    </svg>
  );
}

export function ArrowLongRight(props: IconProps) {
  return (
    <svg viewBox="0 0 34 16" aria-hidden="true" {...props}>
      <path d="M1 8h31M25.5 1.5 32 8l-6.5 6.5" {...stroke} />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m14 6-6 6 6 6" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m10 6 6 6-6 6" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M6.6 3h3l1.5 3.8-2 1.4a12.5 12.5 0 0 0 5.7 5.7l1.4-2 3.8 1.5v3a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z"
        {...stroke}
      />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="2.75" y="5" width="18.5" height="14" rx="2" {...stroke} />
      <path d="m3.5 6.8 8.5 6 8.5-6" {...stroke} />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 21.5s7-5.9 7-11a7 7 0 1 0-14 0c0 5.1 7 11 7 11Z" {...stroke} />
      <circle cx="12" cy="10.2" r="2.6" {...stroke} />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" {...stroke} />
      <path d="M12 6.8V12l3.4 2.1" {...stroke} />
    </svg>
  );
}

export function QuoteMark(props: IconProps) {
  return (
    <svg viewBox="0 0 42 32" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M0 32V17.6C0 7.9 5.2 1.6 15.2 0l1.7 4.5c-5.1 1.5-7.7 4.6-7.9 9.3h8.3V32H0Zm25.1 0V17.6C25.1 7.9 30.3 1.6 40.3 0L42 4.5c-5.1 1.5-7.7 4.6-7.9 9.3h8.3V32H25.1Z"
      />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="m12 17.6-6.1 3.4 1.4-6.9L2 9.3l7-.9L12 2l3 6.4 7 .9-5.3 4.8 1.4 6.9z"
      />
    </svg>
  );
}

export function GoogleGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29A12 12 0 0 0 0 12c0 1.94.47 3.76 1.29 5.38l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.63c-.29-.04-1.27-.13-2.41-.13-2.39 0-4.02 1.46-4.02 4.13V9.9H7.5V13h2.77v8h3.23Z"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" {...stroke} strokeWidth={1.7} />
      <circle cx="12" cy="12" r="4" {...stroke} strokeWidth={1.7} />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M7.1 20H4.2V9.4h2.9V20ZM5.65 8.1a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM20 20h-2.9v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74V20H10.5V9.4h2.78v1.45h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.94 1.93 3.94 4.44V20Z"
      />
    </svg>
  );
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.9 3h3.1l-6.77 7.73L23.2 21h-6.23l-4.88-6.38L6.5 21H3.4l7.24-8.27L3 3h6.38l4.41 5.83L18.9 3Zm-1.09 16.2h1.72L7.29 4.7H5.44l12.37 14.5Z"
      />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.8c-2.64.57-3.2-1.13-3.2-1.13-.43-1.1-1.06-1.4-1.06-1.4-.86-.6.07-.58.07-.58.96.07 1.46.98 1.46.98.85 1.46 2.24 1.04 2.78.79.09-.62.33-1.04.6-1.28-2.11-.24-4.33-1.06-4.33-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.43-1.22.09-2.54 0 0 .8-.26 2.62.98a9 9 0 0 1 4.78 0c1.82-1.24 2.62-.98 2.62-.98.52 1.32.2 2.3.1 2.54.6.66.98 1.51.98 2.55 0 3.65-2.23 4.45-4.35 4.69.34.3.65.87.65 1.76v2.6c0 .27.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" {...stroke} strokeWidth={1.8} />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6 6 18" {...stroke} strokeWidth={1.8} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Treatment icons used by the "Our Services" cards                    */
/* ------------------------------------------------------------------ */

export function FacialIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        d="M10 7.5c3-2.2 9-2.2 12 0 2.4 1.8 2.6 5.4 2.2 8.6-.5 4.3-3.6 8.9-8.2 8.9s-7.7-4.6-8.2-8.9C7.4 12.9 7.6 9.3 10 7.5Z"
        {...stroke}
      />
      <path d="M12.6 14.4h1.9M17.5 14.4h1.9M13.6 19.4c1.5 1.2 3.3 1.2 4.8 0" {...stroke} />
      <path d="m25.6 5.4.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" {...stroke} />
    </svg>
  );
}

export function LaserHairIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M6 24.5c3.5-1.6 6.4-4.4 8.6-8.2" {...stroke} />
      <path d="M9.2 26.6c4.6-1.8 8.4-5.4 11.2-10.6" {...stroke} />
      <rect
        x="17.4"
        y="4.2"
        width="8.4"
        height="12"
        rx="3"
        transform="rotate(28 17.4 4.2)"
        {...stroke}
      />
      <path d="m21.2 19.6-1.6 3M24.4 21.2l-1.5 2.9M18 18.2l-1.6 3" {...stroke} />
    </svg>
  );
}

export function SyringeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="m18.6 8.6 4.8 4.8M26.8 4l1.2 1.2M24.4 6.4l3.2 3.2" {...stroke} />
      <path d="m21.6 5.6 4.8 4.8-9.7 9.7-4.8-4.8 9.7-9.7Z" {...stroke} />
      <path d="m11.9 15.3 4.8 4.8-4.4 4.4-4.8-4.8 4.4-4.4Z" {...stroke} />
      <path d="m7.5 19.7-3.3 3.3M9 27.2l-3.6-3.6" {...stroke} />
    </svg>
  );
}

export function LaserSkinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path
        d="M9.5 9.4c2.7-2.1 8-2.1 10.7 0 2.2 1.7 2.4 5 2 7.9-.5 3.9-3.3 8-7.4 8s-6.9-4.1-7.4-8c-.4-2.9-.1-6.2 2.1-7.9Z"
        {...stroke}
      />
      <path d="M11.8 15.6h1.7M16.2 15.6h1.7" {...stroke} />
      <path d="M24.5 6.5 28 3M26.4 12h4M25.4 18.6l3.4 2.6" {...stroke} />
    </svg>
  );
}

export function IvDripIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <path d="M11 4h10v11.5a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4Z" {...stroke} />
      <path d="M11 9.5h10" {...stroke} />
      <path d="M16 20.5V24" {...stroke} />
      <path d="M16 24c-1.7 1.9-2.6 3.2-2.6 4.2a2.6 2.6 0 0 0 5.2 0c0-1-.9-2.3-2.6-4.2Z" {...stroke} />
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
