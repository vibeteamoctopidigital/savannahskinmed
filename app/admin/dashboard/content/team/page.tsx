import AddTeamMemberButton from '@/components/admin/AddTeamMemberButton';
import AdminTeamMemberCard from '@/components/admin/AdminTeamMemberCard';
import { getAllTeamMembersForAdmin } from '@/lib/data/team';
import { cardClass } from '@/lib/adminUi';

export const dynamic = 'force-dynamic';

export default async function TeamContentPage() {
  const members = await getAllTeamMembersForAdmin();

  return (
    <div className="space-y-8">
      <div className="sticky top-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-white/95 p-4 shadow-card backdrop-blur-md">
        <div>
          <h1 className="font-serif text-[26px] text-navy">Our Team</h1>
          <p className="text-[13px] text-muted">
            Manage expert profiles displayed on the public /our-experts page. Perform full CRUD
            operations below.
          </p>
        </div>
        <AddTeamMemberButton />
      </div>

      {members.length === 0 ? (
        <div className={cardClass}>
          <p className="text-[14px] text-muted">
            No team members found. Click &ldquo;+ Add New Team Member&rdquo; above to create one.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {members.map((member) => (
            <AdminTeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
