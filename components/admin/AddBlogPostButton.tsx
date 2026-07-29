'use client';

import Link from 'next/link';

import { primaryBtn } from '@/lib/adminUi';

export default function AddBlogPostButton() {
  return (
    <Link
      href="/admin/dashboard/content/blog/new"
      className={`${primaryBtn} self-start`}
    >
      + Add Post
    </Link>
  );
}
