import { notFound } from 'next/navigation';

import EditBlogPostForm from '@/components/admin/EditBlogPostForm';
import { getBlogPostByIdForAdmin } from '@/lib/data/blog';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogEditPage({ params }: Props) {
  const { id } = await params;

  if (id === 'new') {
    return <EditBlogPostForm />;
  }

  const post = await getBlogPostByIdForAdmin(id);
  if (!post) {
    notFound();
  }

  return <EditBlogPostForm post={post} />;
}
