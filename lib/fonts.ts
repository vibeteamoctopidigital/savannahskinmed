import { Manrope, Inter, Sora } from 'next/font/google';

// The real Bodoni-72 webfont (self-hosted by savannahskinmed.com) is loaded
// as a plain @font-face in globals.css instead of next/font/local, which
// renames local fonts to an internal family name — a font inspector would
// report "playfair" instead of "Bodoni-72". The hand-written @font-face
// keeps the literal family name identical to the live site.

// The live site renders body copy in Manrope.
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

// ---------------------------------------------------------------------------
// Admin dashboard only. Reuses the exact same CSS variable names as the
// public site's fonts (Tailwind's `font-serif`/`font-sans` resolve to these
// variables) — safe because the admin panel renders its own separate <html>
// root (app/admin/layout.tsx), never alongside the marketing site's. Every
// existing `font-serif`/`font-sans` class in the admin UI picks up Sora/Inter
// automatically, with zero changes needed to the components themselves.
// ---------------------------------------------------------------------------
export const adminHeading = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-playfair',
});

export const adminBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});
