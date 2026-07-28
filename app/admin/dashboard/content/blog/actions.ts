'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

function revalidateBlogPages() {
  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/content/blog');
}

export async function saveBlogPostAction(formData: FormData) {
  const id = String(formData.get('postId') || '');
  if (!id) return;

  const title = String(formData.get('title') || '').trim();

  await prisma.blogPost.update({
    where: { id },
    data: {
      image: String(formData.get('image') || ''),
      imageAlt: title,
      title,
      description: String(formData.get('description') || ''),
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
      imageAlt: title,
      title,
      description: String(formData.get('description') || ''),
    },
  });

  revalidateBlogPages();
}
