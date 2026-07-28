import Link from 'next/link';

import { ArrowRight } from '@/components/icons';

type Variant = 'navy' | 'white' | 'outline';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
};

const variants: Record<Variant, string> = {
  navy: 'bg-navy text-white hover:bg-navy-deep',
  white: 'bg-white text-navy hover:bg-cream',
  outline: 'border border-white/70 text-white hover:bg-white hover:text-navy',
};

export default function ButtonLink({
  href,
  children,
  variant = 'navy',
  withArrow = true,
  className = '',
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full px-10 py-[19px] font-sans text-[13px] font-medium uppercase tracking-widest2 transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
}
