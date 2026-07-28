import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_LOGO_SRC = '/images/samm-logo.png';
const LOGO_W = 576;
const LOGO_H = 264;

type LogoProps = {
  /** `light` uses the white artwork, `dark` re-colours it to navy for the footer. */
  variant?: 'light' | 'dark';
  className?: string;
  /** Override logo image URL (from admin settings). Falls back to static file. */
  src?: string;
};

export default function Logo({ variant = 'light', className = '', src }: LogoProps) {
  const logoSrc = src || FALLBACK_LOGO_SRC;
  return (
    <Link
      href="/"
      aria-label="Savannah Age Management Medicine — home"
      className={`block w-[132px] shrink-0 min-[380px]:w-[150px] lg:w-[124px] ${className}`}
    >
      {variant === 'light' ? (
        <Image
          src={logoSrc}
          alt="Savannah Age Management Medicine"
          width={LOGO_W}
          height={LOGO_H}
          priority
          className="h-auto w-full"
        />
      ) : (
        /* The artwork is white-on-transparent, so its alpha drives a navy mask. */
        <span
          role="img"
          aria-label="Savannah Age Management Medicine"
          className="block w-full bg-navy"
          style={{
            aspectRatio: `${LOGO_W} / ${LOGO_H}`,
            WebkitMaskImage: `url(${logoSrc})`,
            maskImage: `url(${logoSrc})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'left center',
            maskPosition: 'left center',
          }}
        />
      )}
    </Link>
  );
}
