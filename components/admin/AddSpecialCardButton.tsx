'use client';

import Link from 'next/link';

import { primaryBtn } from '@/lib/adminUi';

export default function AddSpecialCardButton() {
  return (
    <Link
      href="/admin/dashboard/content/specials/new"
      className={`${primaryBtn} self-start`}
    >
      + Add New Offer Card
    </Link>
  );
}
