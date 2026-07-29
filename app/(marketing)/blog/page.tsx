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
    <div className="min-h-screen bg-[#FDF9F3] pb-24">
      <PageJsonLd route="/blog" />
      <section className="mx-auto max-w-[1240px] px-6 pt-36 sm:pt-44">
        <div className="mx-auto max-w-[720px] text-center">
          <span className="inline-block rounded-full bg-navy/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-navy uppercase">
            Aesthetic Insights
          </span>
          <h1 className="mt-4 font-serif text-4xl font-normal text-navy sm:text-5xl lg:text-6xl">
            Our Journal
          </h1>
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            Expert skincare advice, aesthetic treatments, and anti-aging medicine insights from the Savannah Age Management Medicine team.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-navy/10 bg-white p-12 text-center shadow-sm">
            <p className="text-[15px] text-muted">
              New posts are coming soon &mdash; check back shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
