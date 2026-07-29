'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

export async function saveTeamMemberAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  if (!id) throw new Error('Missing ID');
  if (id === 'new') {
    return createTeamMemberAction(formData);
  }

  const name = (formData.get('name') as string)?.trim() || 'Unnamed Member';
  const role = (formData.get('role') as string)?.trim() || '';
  const highlight = (formData.get('highlight') as string)?.trim() || '';
  const bio = (formData.get('bio') as string)?.trim() || '';
  const image = (formData.get('image') as string)?.trim() || '';
  const imageAlt = (formData.get('imageAlt') as string)?.trim() || name;
  const sortOrder = parseInt((formData.get('sortOrder') as string) || '0', 10);
  const isActive = formData.get('isActive') === 'true';

  await prisma.teamMember.upsert({
    where: { id },
    update: {
      name,
      role,
      highlight,
      bio,
      image,
      imageAlt,
      sortOrder,
      isActive,
    },
    create: {
      id,
      name,
      role,
      highlight,
      bio,
      image,
      imageAlt,
      sortOrder,
      isActive,
    },
  });

  revalidatePath('/our-experts');
  revalidatePath('/admin/dashboard/content/team');
}

export async function createTeamMemberAction(formData: FormData): Promise<void> {
  const name = (formData.get('name') as string)?.trim() || 'New Team Member';
  const role = (formData.get('role') as string)?.trim() || 'Aesthetician';
  const highlight = (formData.get('highlight') as string)?.trim() || '';
  const bio =
    (formData.get('bio') as string)?.trim() ||
    'Dedicated aesthetic professional committed to patient care and natural results.';
  const image = (formData.get('image') as string)?.trim() || '';
  const imageAlt = (formData.get('imageAlt') as string)?.trim() || name;
  const sortOrder = parseInt((formData.get('sortOrder') as string) || '1', 10);
  const isActive = true;

  await prisma.teamMember.create({
    data: {
      name,
      role,
      highlight,
      bio,
      image,
      imageAlt,
      sortOrder,
      isActive,
    },
  });

  revalidatePath('/our-experts');
  revalidatePath('/admin/dashboard/content/team');
}

export async function deleteTeamMemberAction(formData: FormData): Promise<void> {
  const id = formData.get('id') as string;
  if (!id) throw new Error('Missing ID');
  if (id === 'new') return;

  await prisma.teamMember.deleteMany({ where: { id } });

  revalidatePath('/our-experts');
  revalidatePath('/admin/dashboard/content/team');
}
