'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import DeleteButton from '@/components/admin/DeleteButton';
import {
  deleteTeamMemberAction,
  saveTeamMemberAction,
} from '@/app/admin/dashboard/content/team/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, dangerBtn, inputClass, primaryBtn, smallBtn } from '@/lib/adminUi';

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
  const formRef = useRef<HTMLFormElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [image, setImage] = useState(member.image);
  const [active, setActive] = useState(member.isActive);
  const [saving, startSaveTransition] = useTransition();

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startSaveTransition(async () => {
      try {
        await saveTeamMemberAction(formData);
        await alertSuccess('Team member saved!');
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <div className={cardClass}>
      <form ref={formRef}>
        <input type="hidden" name="id" value={member.id} />
        <input type="hidden" name="image" value={image} />
        <input type="hidden" name="isActive" value={active ? 'true' : 'false'} />

        {/* Header summary row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-navy/10 bg-cream">
              <Image
                src={image}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="56px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-[18px] font-medium text-navy">{member.name}</span>
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
              onClick={() => setActive(!active)}
              className={`rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                active
                  ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20'
                  : 'bg-navy/10 text-navy hover:bg-navy/20'
              }`}
            >
              {active ? 'Active' : 'Hidden'}
            </button>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="rounded-lg border border-navy/15 px-3 py-1.5 text-[12.5px] font-medium text-navy transition-colors hover:bg-mist"
            >
              {expanded ? 'Collapse ▲' : 'Edit ▼'}
            </button>
          </div>
        </div>

        {/* Expanded Editor Form */}
        {expanded && (
          <div className="mt-6 space-y-5 border-t border-navy/10 pt-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[12px] text-muted">Full Name & Credentials</label>
                <input
                  name="name"
                  defaultValue={member.name}
                  placeholder="Harry S. Collins, DO, FACOG, Medical Director"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] text-muted">Role / Subtitle</label>
                <input
                  name="role"
                  defaultValue={member.role}
                  placeholder="Medical Director"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] text-muted">Highlight / Eyebrow (optional)</label>
                <input
                  name="highlight"
                  defaultValue={member.highlight || ''}
                  placeholder="Top-Rated Savannah Medical Director"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] text-muted">Display Order (Sort Order)</label>
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={member.sortOrder}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[12px] text-muted">
                Biography (separate paragraphs with blank lines)
              </label>
              <textarea
                name="bio"
                rows={6}
                defaultValue={member.bio}
                placeholder="Write the team member's biography here..."
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2 items-center">
              <div>
                <label className="mb-1 block text-[12px] text-muted">Profile Image</label>
                <CloudinaryUpload
                  folder="team"
                  currentUrl={image}
                  onUploaded={(url: string) => setImage(url)}
                  label="Upload Profile Photo"
                />
                <p className="mt-1 text-[11px] text-muted">Or paste image URL below:</p>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className={`${inputClass} mt-1`}
                />
              </div>

              <div>
                <label className="mb-1 block text-[12px] text-muted">Image Alt Text</label>
                <input
                  name="imageAlt"
                  defaultValue={member.imageAlt || member.name}
                  placeholder="Harry S. Collins, DO, FACOG, Medical Director"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 pt-5">
              <DeleteButton
                action={deleteTeamMemberAction}
                id={member.id}
                itemLabel={`team member ${member.name}`}
                className={dangerBtn}
              />

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={`${primaryBtn} ${saving ? 'opacity-60' : ''}`}
              >
                {saving ? 'Saving…' : 'Save Team Member'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
