'use client';

import { trackClickToCall } from '@/lib/analytics';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
};

/** Plain `<a href="tel:...">` that also fires a GA4 click_to_call event —
 * used wherever a phone link sits inside a Server Component that can't
 * attach its own onClick handler. */
export default function TrackedPhoneLink({ href, className, children }: Props) {
  return (
    <a href={href} className={className} onClick={trackClickToCall}>
      {children}
    </a>
  );
}
