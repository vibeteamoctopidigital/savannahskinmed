'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

function revalidateBlogPages() {
  revalidatePath('/blog');
  revalidatePath('/admin/dashboard/content/blog');
}

export async function saveBlogPostAction(formData: FormData) {
  const id = String(formData.get('postId') || formData.get('id') || '');
  if (!id) return;
  if (id === 'new') {
    return createBlogPostAction(formData);
  }

  const title = String(formData.get('title') || '').trim() || 'Untitled Blog Post';
  const slug = String(formData.get('slug') || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const category = String(formData.get('category') || '').trim();
  const tags = String(formData.get('tags') || '').trim();
  const author = String(formData.get('author') || '').trim();
  const readingTime = parseInt(String(formData.get('readingTime') || '5'), 10) || 5;
  const excerpt = String(formData.get('excerpt') || '').trim();
  const image = String(formData.get('image') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const metaTitle = String(formData.get('metaTitle') || title).trim();
  const metaDescription = String(formData.get('metaDescription') || excerpt).trim();
  const keywords = String(formData.get('keywords') || '').trim();

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      category,
      tags,
      author,
      readingTime,
      excerpt,
      image,
      imageAlt: title,
      description,
      metaTitle,
      metaDescription,
      keywords,
    },
  });

  revalidateBlogPages();
}

export async function deleteBlogPostAction(formData: FormData) {
  const id = String(formData.get('id') || formData.get('postId') || '');
  if (!id || id === 'new') return;
  await prisma.blogPost.deleteMany({ where: { id } });
  revalidateBlogPages();
}

export async function createBlogPostAction(formData: FormData) {
  const title = String(formData.get('title') || '').trim() || 'New Blog Post';
  const slug =
    String(formData.get('slug') || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const category = String(formData.get('category') || 'Aesthetic Medicine').trim();
  const tags = String(formData.get('tags') || 'Aesthetics, Skin Care').trim();
  const author = String(formData.get('author') || 'Savannah Age Management Medicine Team').trim();
  const readingTime = parseInt(String(formData.get('readingTime') || '5'), 10) || 5;
  const excerpt = String(
    formData.get('excerpt') || 'Explore advanced aesthetic treatments and personalized skin care.'
  ).trim();
  const image = String(formData.get('image') || '').trim();
  const description = String(
    formData.get('description') ||
      'Write your blog post article in normal text.'
  ).trim();
  const metaTitle = String(formData.get('metaTitle') || title).trim();
  const metaDescription = String(formData.get('metaDescription') || excerpt).trim();
  const keywords = String(formData.get('keywords') || 'Aesthetics, Med Spa, Savannah').trim();

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      category,
      tags,
      author,
      readingTime,
      excerpt,
      image,
      imageAlt: title,
      description,
      metaTitle,
      metaDescription,
      keywords,
    },
  });

  revalidateBlogPages();
}
