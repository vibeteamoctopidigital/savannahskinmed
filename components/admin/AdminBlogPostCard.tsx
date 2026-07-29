'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import DeleteButton from '@/components/admin/DeleteButton';
import { deleteBlogPostAction } from '@/app/admin/dashboard/content/blog/actions';
import { dangerBtn, primaryBtn } from '@/lib/adminUi';

type BlogPostCardProps = {
  post: {
    id: string;
    image: string;
    title: string;
    description: string;
  };
};

export default function AdminBlogPostCard({ post }: BlogPostCardProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-card transition-all hover:shadow-card-hover">
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-cream/40">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[13px] text-muted">
              No Image
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="font-serif text-[18px] text-navy line-clamp-1">{post.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted line-clamp-2">
            {post.description.replace(/<[^>]+>/g, '') || 'No content yet...'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-navy/[0.06] bg-cream/20 px-5 py-3">
        <Link
          href={`/admin/dashboard/content/blog/${post.id}`}
          className={`${primaryBtn} text-[13px]`}
        >
          Edit ✎
        </Link>
        <DeleteButton
          id={post.id}
          label="Delete"
          itemLabel={post.title}
          action={async (formData) => {
            await deleteBlogPostAction(formData);
            router.refresh();
          }}
          className={dangerBtn}
        />
      </div>
    </div>
  );
}
