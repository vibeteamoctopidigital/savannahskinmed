import Image from 'next/image';

import type { BlogPostCard as BlogPostCardData } from '@/lib/data/blog';

export default function BlogPostCard({ post }: { post: BlogPostCardData }) {
  return (
    <article className="group overflow-hidden rounded-[18px] bg-white shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-navy/15">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-7 sm:p-8">
        <h3 className="font-serif text-[20px] leading-tight text-navy">{post.title}</h3>
        <p className="mt-3 text-[14.5px] leading-[1.75] text-muted">{post.description}</p>
      </div>
    </article>
  );
}
