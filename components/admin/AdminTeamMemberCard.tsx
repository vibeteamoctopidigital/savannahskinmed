'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { saveTeamMemberAction } from '@/app/admin/dashboard/content/team/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass } from '@/lib/adminUi';

type TeamMemberProps = {
  member: {
    id: string;
    name: string;
    role: string;
    highlight?: string;
    bio: string;
    image: string;
    imageAlt?: string;
    sortOrder: number;
    isActive: boolean;
  };
};

export default function AdminTeamMemberCard({ member }: TeamMemberProps) {
  const [active, setActive] = useState(member.isActive);
  const [saving, startSaveTransition] = useTransition();

  const handleToggleActive = () => {
    const nextActive = !active;
    setActive(nextActive);

    startSaveTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('id', member.id);
        formData.append('name', member.name);
        formData.append('role', member.role);
        formData.append('bio', member.bio);
        formData.append('image', member.image);
        formData.append('sortOrder', String(member.sortOrder));
        formData.append('isActive', nextActive ? 'true' : 'false');
        if (member.highlight) formData.append('highlight', member.highlight);

        await saveTeamMemberAction(formData);
        await alertSuccess(`"${member.name}" is now ${nextActive ? 'Active' : 'Hidden'}`);
      } catch (err) {
        setActive(!nextActive); // revert on error
        await alertError(
          'Failed to update status',
          err instanceof Error ? err.message : undefined
        );
      }
    });
  };

  return (
    <div className={`${cardClass} flex flex-col justify-between h-full`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-navy/10 bg-cream">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="56px"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-[18px] font-medium text-navy">
                {member.name}
              </span>
              {!active && (
                <span className="rounded-full bg-navy/10 px-2 py-0.5 text-[11px] font-medium text-muted">
                  Hidden
                </span>
              )}
            </div>
            <p className="text-[12.5px] uppercase tracking-wider text-rose-deep">
              {member.role || 'No role set'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleActive}
            disabled={saving}
            className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
              active
                ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
                : 'bg-navy/10 text-navy hover:bg-navy/20'
            }`}
          >
            {saving ? '...' : active ? 'Active' : 'Hidden'}
          </button>

          <Link
            href={`/admin/dashboard/content/team/${member.id}`}
            className="rounded-lg border border-navy/15 px-4 py-1.5 text-[12.5px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
          >
            Edit ✎
          </Link>
        </div>
      </div>
    </div>
  );
}
