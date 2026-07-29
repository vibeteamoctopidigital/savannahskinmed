import Link from 'next/link';
import { notFound } from 'next/navigation';

import EditTeamMemberForm from '@/components/admin/EditTeamMemberForm';
import { getTeamMemberByIdForAdmin } from '@/lib/data/team';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTeamMemberPage({ params }: Props) {
  const { id } = await params;

  if (id === 'new') {
    return (
      <EditTeamMemberForm
        member={{
          id: 'new',
          name: '',
          role: '',
          highlight: '',
          bio: '',
          image: '',
          imageAlt: 'New Team Member',
          sortOrder: 1,
          isActive: true,
        }}
      />
    );
  }

  const member = await getTeamMemberByIdForAdmin(id);

  if (!member) {
    return (
      <div className="mx-auto max-w-xl text-center py-16 space-y-4">
        <h1 className="font-serif text-[26px] text-navy">Team Member Not Found</h1>
        <p className="text-[14px] text-muted">
          We could not find a team member profile with the ID &ldquo;{id}&rdquo;.
        </p>
        <Link
          href="/admin/dashboard/content/team"
          className="inline-block rounded-xl bg-navy px-6 py-2.5 text-[14px] font-medium text-white shadow-md transition-all hover:bg-navy-light"
        >
          ← Back to Our Team
        </Link>
      </div>
    );
  }

  return <EditTeamMemberForm member={member} />;
}
