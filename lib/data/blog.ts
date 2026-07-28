import { prisma } from '@/lib/prisma';

export type BlogPostCard = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
};

/** Public read — active posts only. No static fallback exists for blog
 * content, so an unreachable database just yields an empty list rather
 * than an error. */
export async function getBlogPosts(): Promise<BlogPostCard[]> {
  try {
    return await prisma.blogPost.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, image: true, imageAlt: true, title: true, description: true },
    });
  } catch {
    return [];
  }
}
