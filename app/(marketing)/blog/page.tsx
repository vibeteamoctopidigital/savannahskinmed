import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
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
      <PageHero
        title="Blog"
        intro="Skincare and aesthetic medicine insights from our team."
        image="/images/banner-bg.jpg"
        imageAlt="Savannah Age Management Medicine"
      />
      <section className="mx-auto max-w-[1200px] px-5 py-20 sm:py-28">
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-[15px] text-muted">
            New posts are coming soon &mdash; check back shortly.
          </p>
        )}
      </section>
    </>
  );
}
