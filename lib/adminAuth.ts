/**
 * Deliberately minimal "no real auth system" gate: a single cookie whose
 * value is checked by strict string equality. No JWT, no session store, no
 * expiry logic beyond the cookie's own maxAge.
 */
export const ADMIN_SESSION_COOKIE = 'sam_admin_session';
export const ADMIN_SESSION_VALUE = 'sam-7f2c9e6a1d4b8f03-admin-session';
