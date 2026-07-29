/** Convert any text to a URL-friendly slug. */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Shared style tokens for the admin dashboard, so every content/settings
 * page renders consistent inputs, buttons and cards instead of each file
 * redefining its own near-identical class strings. */

export const cardClass = 'rounded-2xl border border-navy/[0.06] bg-white p-6 shadow-card sm:p-8';

export const inputClass =
  'w-full rounded-xl border border-navy/15 bg-white px-3.5 py-2.5 text-[14px] text-navy outline-none transition-colors placeholder:text-muted/60 focus:border-navy focus:ring-4 focus:ring-navy/10';

export const labelClass = 'mb-1.5 block text-[12.5px] font-medium text-navy/80';

/** Solid primary action (e.g. "Save All Changes"). */
export const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50';

/** Secondary outlined button (used for "Edit" links). */
export const secondaryBtn =
  'rounded-lg border border-navy/15 px-4 py-1.5 text-[12.5px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white';

/** Small outlined button (e.g. "Add Row"). */
export const smallBtn =
  'rounded-xl border border-navy/15 px-3.5 py-2 text-[12.5px] font-medium text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white';

/** Text-only destructive action (e.g. "Delete"). */
export const dangerBtn =
  'text-[12.5px] font-medium text-red-600 transition-colors hover:text-red-700 hover:underline underline-offset-2';

const statusStyles: Record<string, string> = {
  // Submission status
  NEW: 'bg-teal/15 text-teal-dark',
  CONTACTED: 'bg-sand/20 text-navy',
  CLOSED: 'bg-navy/8 text-muted',
  // Submission type
  BOOKING: 'bg-navy/8 text-navy',
  CLAIM: 'bg-rose-pale text-rose-deep',
  MEMBERSHIP_REQUEST: 'bg-sage/15 text-sage',
  CONTACT: 'bg-sand/20 text-navy',
};

/** Colored pill for a submission's status/type — falls back to a neutral
 * style for any value that isn't explicitly mapped. */
export function badgeClass(value: string) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide';
  return `${base} ${statusStyles[value] ?? 'bg-navy/8 text-navy/70'}`;
}
