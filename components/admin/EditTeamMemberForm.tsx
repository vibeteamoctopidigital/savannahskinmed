'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import DeleteButton from '@/components/admin/DeleteButton';
import {
  deleteTeamMemberAction,
  saveTeamMemberAction,
} from '@/app/admin/dashboard/content/team/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, dangerBtn, inputClass, primaryBtn } from '@/lib/adminUi';
import type { TeamMemberData } from '@/lib/data/shape';

type Props = {
  member: TeamMemberData;
};

export default function EditTeamMemberForm({ member }: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [image, setImage] = useState(member.image);
  const [active, setActive] = useState(member.isActive);
  const [saving, startSaveTransition] = useTransition();

  const handleSave = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startSaveTransition(async () => {
      try {
        await saveTeamMemberAction(formData);
        await alertSuccess('Team member profile saved successfully!');
        router.push('/admin/dashboard/content/team');
        router.refresh();
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Top Navigation & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/dashboard/content/team"
            className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-navy/5 px-3 py-1.5 text-[13px] font-medium text-navy transition-colors hover:bg-navy/10"
          >
            ← Back to Our Team
          </Link>
          <h1 className="font-serif text-[28px] text-navy">Edit Profile: {member.name}</h1>
          <p className="text-[13.5px] text-muted">
            Edit the full credentials, photo, and bio for this team member below.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`rounded-xl px-4 py-2 text-[14px] font-semibold transition-all shadow-sm ${
            active
              ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:bg-emerald-500/20'
              : 'bg-navy/10 text-navy border border-navy/20 hover:bg-navy/20'
          }`}
        >
          Status: {active ? 'Active on Website' : 'Hidden from Website'}
        </button>
      </div>

      {/* Main Edit Card */}
      <div className="relative rounded-3xl border border-navy/10 bg-white p-8 shadow-card">
        <form ref={formRef} className="space-y-8">
          <input type="hidden" name="id" value={member.id} />
          <input type="hidden" name="image" value={image} />
          <input type="hidden" name="isActive" value={active ? 'true' : 'false'} />

          {/* Top Section: Photo & Basic Details */}
          <div className="grid gap-8 lg:grid-cols-[260px_1fr] items-start">
            {/* Left: Profile Photo Preview & Uploader */}
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-navy/10 bg-cream/50 p-6 text-center">
              <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-[6px] border-white bg-navy/10 shadow-xl">
                {image ? (
                  <Image
                    src={image}
                    alt={member.name || 'Team member'}
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                  />
                ) : (
                  <span className="text-[13px] font-medium text-muted">No Photo Selected</span>
                )}
              </div>
              <div>
                <p className="font-serif text-[15px] font-medium text-navy">Profile Image</p>
                <p className="text-[12px] text-muted">Square ratio recommended (e.g. 600x600)</p>
              </div>
              <div className="w-full space-y-2.5">
                <CloudinaryUpload
                  folder="savannahskinmed/team"
                  currentUrl={image}
                  onUploaded={(url) => setImage(url)}
                  label="Upload New Photo"
                />
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Or paste photo URL..."
                  className={`${inputClass} text-center text-[12px] font-mono`}
                />
              </div>
            </div>

            {/* Right: Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-medium text-navy">
                  Full Name & Credentials <span className="text-rose-deep">*</span>
                </label>
                <input
                  name="name"
                  defaultValue={member.name}
                  placeholder="Harry S. Collins, DO, FACOG, Medical Director"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-navy">
                  Role / Subtitle <span className="text-rose-deep">*</span>
                </label>
                <input
                  name="role"
                  defaultValue={member.role}
                  placeholder="Medical Director"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-navy">
                  Highlight / Eyebrow (optional)
                </label>
                <input
                  name="highlight"
                  defaultValue={member.highlight || ''}
                  placeholder="Top-Rated Savannah Medical Director"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-navy">
                  Display Order (Sort Order)
                </label>
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={member.sortOrder}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col justify-end">
                <p className="text-[12px] text-muted mb-1">
                  Lower numbers display first on the /our-experts page.
                </p>
              </div>
            </div>
          </div>

          {/* Biography Section */}
          <div className="border-t border-navy/10 pt-8">
            <label className="mb-2 block text-[14px] font-medium text-navy">
              Biography <span className="text-rose-deep">*</span>
            </label>
            <p className="mb-3 text-[12.5px] text-muted">
              Write or edit the team member&apos;s full bio. Separate multiple paragraphs with a blank line.
            </p>
            <textarea
              name="bio"
              rows={12}
              defaultValue={member.bio}
              placeholder="Write the team member's biography here..."
              className={`${inputClass} font-sans leading-relaxed`}
              required
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="sticky bottom-0 z-30 -mx-8 -mb-8 mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy/10 bg-white/95 px-8 py-5 rounded-b-3xl shadow-lg backdrop-blur-md">
            <DeleteButton
              id={member.id}
              label="Delete Member"
              itemLabel={member.name}
              action={async (formData) => {
                await deleteTeamMemberAction(formData);
                router.push('/admin/dashboard/content/team');
                router.refresh();
              }}
              className={dangerBtn}
            />

            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard/content/team"
                className="rounded-xl border border-navy/20 px-5 py-2.5 text-[14px] font-medium text-navy transition-colors hover:bg-mist"
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className={`${primaryBtn} min-w-[160px]`}
              >
                {saving ? 'Saving...' : 'Save Team Member'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
