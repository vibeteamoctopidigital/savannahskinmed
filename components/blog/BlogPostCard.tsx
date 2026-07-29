import Image from 'next/image';
import Link from 'next/link';

import type { BlogPostCard as BlogPostCardData } from '@/lib/data/blog';

export default function BlogPostCard({ post }: { post: BlogPostCardData }) {
  return (
    <article className="group overflow-hidden rounded-[18px] bg-white shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/15">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image || '/images/banner-bg.jpg'}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-[19px] leading-tight text-navy">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-[14px] leading-[1.75] text-muted">{post.description}</p>
        <Link
          href={`/blog/${post.id}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-[12px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep"
        >
          VIEW DETAILS
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </Link>
      </div>
    </article>
  );
}
