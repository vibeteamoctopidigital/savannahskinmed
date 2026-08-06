import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(post.createdAt);

  const paragraphs = post.description
    .split(/\n\n+|\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const tagsList = post.tags
    ? post.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white pb-24 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[800px] px-6">
          {/* Top Bar / Navigation */}
          <div className="flex items-center justify-between border-b border-navy/10 pb-5 text-[13px]">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-medium text-navy/70 transition-colors hover:text-navy"
            >
              ← Back to all posts
            </Link>
            <div className="flex items-center gap-2 text-muted">
              <span className="font-semibold text-navy">
                {post.category || 'Aesthetic Medicine'}
              </span>
              <span>•</span>
              <span>{post.readingTime || 5} min read</span>
            </div>
          </div>

          {/* Title & Author Meta */}
          <header className="mt-8">
            <h1 className="font-serif text-3xl font-normal leading-[1.25] text-navy sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-[14px] text-muted">
              <span>By <strong className="font-medium text-navy">{post.author || 'Savannah Age Management Medicine Team'}</strong></span>
              <span>•</span>
              <span>{formattedDate}</span>
            </div>
          </header>

          {/* Editorial Cover Image (No banner) */}
          {post.image && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-navy/10 bg-cream/30 shadow-sm">
              <Image
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                sizes="(max-width: 800px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Organized Editorial Content */}
          <div className="mt-10 space-y-6">
            {paragraphs.map((para, idx) => {
              // Automatically detect subheading-style lines
              if (
                para.length < 80 &&
                (para.endsWith(':') ||
                  para.startsWith('## ') ||
                  para.startsWith('# ') ||
                  para.startsWith('1. ') ||
                  para.startsWith('2. ') ||
                  para.startsWith('3. '))
              ) {
                const cleanText = para.replace(/^#+\s*/, '');
                return (
                  <h2
                    key={idx}
                    className="mt-10 mb-2 font-serif text-2xl font-semibold text-navy"
                  >
                    {cleanText}
                  </h2>
                );
              }

              return (
                <p
                  key={idx}
                  className="text-[16.5px] font-normal leading-[1.85] text-navy/85"
                >
                  {para}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-navy/10 pt-8">
              <span className="mr-2 text-[13px] font-semibold text-navy">Tags:</span>
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-navy/10 bg-cream/60 px-3.5 py-1 text-[13px] font-medium text-navy"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Call To Action Box */}
          <div className="mt-14 rounded-2xl border border-navy/10 bg-cream/40 p-8 text-center sm:p-10">
            <h3 className="font-serif text-2xl text-navy">
              Ready for Personalized Aesthetic Care?
            </h3>
            <p className="mt-3 text-[15px] text-muted">
              Schedule a private consultation with the Savannah Age Management Medicine team today.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/specials"
                className="rounded-xl bg-navy px-6 py-3 text-sm font-medium text-white transition-all hover:bg-navy-deep"
              >
                View Specials
              </Link>
              <Link
                href="/contact-us"
                className="rounded-xl border border-navy/20 bg-white px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-cream/50"
              >
                Contact Our Clinic
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
