import Link from 'next/link';

import type { BlogPostCard as BlogPostCardData } from '@/lib/data/blog';

export default function BlogPostCard({ post }: { post: BlogPostCardData }) {
  return (
    <article className="group border-b border-navy/10 py-9 first:pt-0 last:border-b-0">
      <h3 className="font-serif text-[24px] leading-tight text-navy">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-[15px] leading-[1.8] text-muted">{post.description}</p>
      <Link
        href={`/blog/${post.id}`}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-[12px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep"
      >
        VIEW DETAILS
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </Link>
    </article>
  );
}
