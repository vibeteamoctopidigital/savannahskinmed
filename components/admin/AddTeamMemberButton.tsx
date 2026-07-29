'use client';

import Link from 'next/link';

import { primaryBtn } from '@/lib/adminUi';

export default function AddTeamMemberButton() {
  return (
    <Link
      href="/admin/dashboard/content/team/new"
      className={`${primaryBtn} self-start`}
    >
      + Add New Team Member
    </Link>
  );
}
