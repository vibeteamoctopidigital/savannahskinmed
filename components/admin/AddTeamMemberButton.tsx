'use client';

import { useRef, useState, useTransition } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import { createTeamMemberAction } from '@/app/admin/dashboard/content/team/actions';
import { alertError, alertSuccess } from '@/lib/adminAlerts';
import { cardClass, inputClass, primaryBtn, smallBtn } from '@/lib/adminUi';

export default function AddTeamMemberButton() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('/images/team-11-img.png');
  const [creating, startCreateTransition] = useTransition();

  const handleCreate = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    startCreateTransition(async () => {
      try {
        await createTeamMemberAction(formData);
        await alertSuccess('Team member added!');
        setOpen(false);
      } catch (err) {
        await alertError('Something went wrong', err instanceof Error ? err.message : undefined);
      }
    });
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${primaryBtn} self-start`}
      >
        + Add New Team Member
      </button>
    );
  }

  return (
    <div className={`${cardClass} border-2 border-navy/20`}>
      <div className="mb-4 flex items-center justify-between border-b border-navy/10 pb-3">
        <h3 className="font-serif text-[19px] font-medium text-navy">Add New Team Member</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[13px] text-muted hover:text-navy"
        >
          Cancel ✕
        </button>
      </div>

      <form ref={formRef} className="space-y-5">
        <input type="hidden" name="image" value={image} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[12px] text-muted">Full Name & Credentials</label>
            <input
              name="name"
              placeholder="Jane Doe, FNP-C"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-muted">Role / Subtitle</label>
            <input
              name="role"
              placeholder="Nurse Practitioner"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-muted">Highlight / Eyebrow (optional)</label>
            <input
              name="highlight"
              placeholder="Top-Rated Savannah Nurse Practitioner"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
            <input
              name="sortOrder"
              type="number"
              defaultValue="5"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[12px] text-muted">Biography</label>
          <textarea
            name="bio"
            rows={5}
            required
            placeholder="Write biography paragraphs here (separate with blank lines)..."
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 items-center">
          <div>
            <label className="mb-1 block text-[12px] text-muted">Profile Photo</label>
            <CloudinaryUpload
              folder="team"
              currentUrl={image}
              onUploaded={(url: string) => setImage(url)}
              label="Upload Photo"
            />
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-muted">Image Alt Text</label>
            <input
              name="imageAlt"
              placeholder="Jane Doe, FNP-C"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-navy/10 pt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl border border-navy/15 px-4 py-2 text-[13px] font-medium text-navy transition-colors hover:bg-mist"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            disabled={creating}
            className={`${primaryBtn} ${creating ? 'opacity-60' : ''}`}
          >
            {creating ? 'Adding…' : 'Add Team Member'}
          </button>
        </div>
      </form>
    </div>
  );
}
