import { prisma } from '@/lib/prisma';

export type BlogPostCard = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

/** Public read — most recently published post first. No static fallback
 * exists for blog content, so an unreachable database just yields an empty
 * list rather than an error. */
export async function getBlogPosts(): Promise<BlogPostCard[]> {
  try {
    return await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, image: true, imageAlt: true, title: true, description: true },
    });
  } catch {
    return [];
  }
}

export type BlogPostDetail = BlogPostCard & { createdAt: Date };

/** Single post for the /blog/[id] detail page. */
export async function getBlogPostById(id: string): Promise<BlogPostDetail | null> {
  try {
    return await prisma.blogPost.findUnique({
      where: { id },
      select: { id: true, image: true, imageAlt: true, title: true, description: true, createdAt: true },
    });
  } catch {
    return null;
  }
}
