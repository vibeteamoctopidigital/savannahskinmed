import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHero from '@/components/ui/PageHero';
import { getBlogPostById } from '@/lib/data/blog';
import { SITE_URL } from '@/lib/siteUrl';

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) return {};

  const canonical = `${SITE_URL}/blog/${post.id}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical },
    openGraph: { title: post.title, description: post.description, url: canonical, type: 'article' },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  };
}

export const revalidate = 300;

export default async function BlogPostDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || undefined,
    datePublished: post.createdAt.toISOString(),
    url: `${SITE_URL}/blog/${post.id}`,
    publisher: { '@type': 'MedicalBusiness', name: 'Savannah Age Management Medicine' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        title={post.title}
        image={post.image || '/images/banner-bg.jpg'}
        imageAlt={post.imageAlt || post.title}
      />
      <article className="mx-auto max-w-[760px] px-5 py-20 sm:py-28">
        {post.image && (
          <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-[18px]">
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              sizes="(max-width: 800px) 100vw, 760px"
              className="object-cover"
              priority
            />
          </div>
        )}
        <p className="whitespace-pre-line text-[16px] leading-[1.9] text-muted">
          {post.description}
        </p>
        <Link
          href="/blog"
          className="mt-10 inline-flex items-center gap-2 text-[13px] font-semibold text-navy transition-colors hover:text-rose-deep"
        >
          &larr; Back to all posts
        </Link>
      </article>
    </>
  );
}
