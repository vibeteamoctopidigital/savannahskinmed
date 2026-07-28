import { prisma } from '@/lib/prisma';
import AdminBlogPostCard from '@/components/admin/AdminBlogPostCard';
import AddBlogPostButton from '@/components/admin/AddBlogPostButton';
import { cardClass } from '@/lib/adminUi';

export const dynamic = 'force-dynamic';

export default async function BlogContentPage() {
  let posts;
  try {
    posts = await prisma.blogPost.findMany({ orderBy: { sortOrder: 'asc' } });
  } catch {
    return (
      <div className={cardClass}>
        <h1 className="mb-2 font-serif text-[24px] text-navy">Blog</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations to manage
          this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Blog</h1>
        <p className="text-[13px] text-muted">
          Manage posts on the public /blog page. Upload images via Cloudinary, edit content, then
          save each post.
        </p>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-navy">Posts</h2>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-muted">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
            <AddBlogPostButton />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <AdminBlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
