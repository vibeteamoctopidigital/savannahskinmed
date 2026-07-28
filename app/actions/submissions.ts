'use server';

import { z } from 'zod';

import { createSubmission } from '@/lib/data/submissions';
import { SubmissionType } from '@/lib/generated/prisma/client';

export type ActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = 'Something went wrong. Please call the office instead.';

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function submitContact(formData: FormData): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  });
  if (!parsed.success) return { ok: false, error: GENERIC_ERROR };

  const result = await createSubmission({ type: SubmissionType.CONTACT, ...parsed.data });
  return result.ok ? { ok: true } : { ok: false, error: GENERIC_ERROR };
}

const bookingSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  service: z.string().min(1),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export async function submitBooking(formData: FormData): Promise<ActionResult> {
  const parsed = bookingSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    location: formData.get('location'),
    service: formData.get('service'),
    preferredDate: formData.get('preferredDate') || undefined,
    preferredTime: formData.get('preferredTime') || undefined,
    notes: formData.get('notes') || undefined,
  });
  if (!parsed.success) return { ok: false, error: GENERIC_ERROR };

  const result = await createSubmission({ type: SubmissionType.BOOKING, ...parsed.data });
  return result.ok ? { ok: true } : { ok: false, error: GENERIC_ERROR };
}

const claimSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  offerId: z.string().optional(),
  offerLabel: z.string().optional(),
});

export async function submitClaim(formData: FormData): Promise<ActionResult> {
  const parsed = claimSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    offerId: formData.get('offerId') || undefined,
    offerLabel: formData.get('offerLabel') || undefined,
  });
  if (!parsed.success) return { ok: false, error: GENERIC_ERROR };

  const result = await createSubmission({ type: SubmissionType.CLAIM, ...parsed.data });
  return result.ok ? { ok: true } : { ok: false, error: GENERIC_ERROR };
}

const membershipRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  message: z.string().optional(),
});

export async function submitMembershipRequest(formData: FormData): Promise<ActionResult> {
  const parsed = membershipRequestSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    location: formData.get('location'),
    message: formData.get('message') || undefined,
  });
  if (!parsed.success) return { ok: false, error: GENERIC_ERROR };

  const result = await createSubmission({
    type: SubmissionType.MEMBERSHIP_REQUEST,
    ...parsed.data,
  });
  return result.ok ? { ok: true } : { ok: false, error: GENERIC_ERROR };
}
