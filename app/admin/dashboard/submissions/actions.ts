'use server';

import { revalidatePath } from 'next/cache';

import { deleteSubmission, updateSubmissionStatus } from '@/lib/data/submissions';
import { SubmissionStatus } from '@/lib/generated/prisma/client';

export async function updateStatusAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  const status = String(formData.get('status') || '') as SubmissionStatus;
  if (!id || !Object.values(SubmissionStatus).includes(status)) return;

  await updateSubmissionStatus(id, status);
  revalidatePath('/admin/dashboard/submissions');
  revalidatePath('/admin/dashboard');
}

export async function deleteSubmissionAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;

  await deleteSubmission(id);
  revalidatePath('/admin/dashboard/submissions');
  revalidatePath('/admin/dashboard');
}
