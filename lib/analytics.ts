/** Fire-and-forget GA4 event helper. No-ops when GA4 hasn't loaded (no
 * measurement ID configured, or running on the server) — callers never
 * need to guard the call themselves. */
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === 'undefined') return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('event', name, params);
}

export function trackClickToCall() {
  trackEvent('click_to_call', { event_category: 'engagement', event_label: 'phone_link' });
}
