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

export type BlogPostDetail = BlogPostCard & {
  createdAt: Date;
  category?: string | null;
  author?: string | null;
  readingTime?: number | null;
  tags?: string | null;
};

/** Single post for the /blog/[id] detail page. */
export async function getBlogPostById(id: string): Promise<BlogPostDetail | null> {
  try {
    return await prisma.blogPost.findUnique({
      where: { id },
      select: {
        id: true,
        image: true,
        imageAlt: true,
        title: true,
        description: true,
        createdAt: true,
        category: true,
        author: true,
        readingTime: true,
        tags: true,
      },
    });
  } catch {
    return null;
  }
}

export type AdminBlogPostData = {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string;
  author: string;
  readingTime: number;
  excerpt: string;
  image: string;
  imageAlt: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  createdAt: string;
};

export async function getBlogPostByIdForAdmin(id: string): Promise<AdminBlogPostData | null> {
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return null;

    const dateStr = post.createdAt ? post.createdAt.toISOString().split('T')[0] : '';
    return {
      id: post.id,
      title: post.title,
      slug: post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      category: post.category || 'Aesthetic Medicine',
      tags: post.tags || 'Aesthetics, Skin Care, Anti-Aging',
      author: post.author || 'Savannah Age Management Medicine Team',
      readingTime: post.readingTime || 5,
      excerpt: post.excerpt || post.description.slice(0, 160),
      image: post.image || '',
      imageAlt: post.imageAlt || post.title,
      description: post.description || '',
      metaTitle: post.metaTitle || post.title,
      metaDescription: post.metaDescription || post.description.slice(0, 160),
      keywords: post.keywords || 'Aesthetic Medicine, Savannah Med Spa',
      createdAt: dateStr,
    };
  } catch {
    return null;
  }
}

