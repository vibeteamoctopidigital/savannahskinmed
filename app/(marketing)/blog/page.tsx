import type { Metadata } from 'next';

import BlogPostCard from '@/components/blog/BlogPostCard';
import { getBlogPosts } from '@/lib/data/blog';
import { buildPageMetadata, PageJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/blog');
}

export const revalidate = 300;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageJsonLd route="/blog" />
      <section className="mx-auto max-w-[1200px] px-5 pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-[120px]">
        <div className="mx-auto max-w-[680px] text-center">
          <h1 className="display-2">Blog</h1>
          <p className="mt-4 text-[15px] leading-[1.8] text-muted">
            Skincare and aesthetic medicine insights from our team.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-14 text-center text-[15px] text-muted">
            New posts are coming soon &mdash; check back shortly.
          </p>
        )}
      </section>
    </>
  );
}
