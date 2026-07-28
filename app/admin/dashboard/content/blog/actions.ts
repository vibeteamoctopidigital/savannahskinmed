'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

function revalidateBlogPages() {
  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/content/blog');
}

function toOrder(raw: FormDataEntryValue | null) {
  return Math.max(0, Number(raw || 1) - 1);
}

export async function saveBlogPostAction(formData: FormData) {
  const id = String(formData.get('postId') || '');
  if (!id) return;

  await prisma.blogPost.update({
    where: { id },
    data: {
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title: String(formData.get('title') || ''),
      description: String(formData.get('description') || ''),
      sortOrder: toOrder(formData.get('sortOrder')),
      isActive: formData.get('isActive') === 'on',
    },
  });

  revalidateBlogPages();
}

export async function deleteBlogPostAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.blogPost.delete({ where: { id } });
  revalidateBlogPages();
}

export async function createBlogPostAction(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  if (!title) return;

  await prisma.blogPost.create({
    data: {
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title,
      description: String(formData.get('description') || ''),
      sortOrder: toOrder(formData.get('sortOrder')),
      isActive: true,
    },
  });

  revalidateBlogPages();
}
