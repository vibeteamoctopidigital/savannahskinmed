'use client';

import { useState } from 'react';

export type SubmissionDetailData = {
  id: string;
  type: string;
  offerLabel?: string | null;
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  service?: string | null;
  preferredDate?: string | null;
  message?: string | null;
  createdAtFormatted: string;
  status: string;
};

type Props = {
  submission: SubmissionDetailData;
  badgeClassName: string;
  typeLabel: string;
};

export default function SubmissionDetailsModal({
  submission,
  badgeClassName,
  typeLabel,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const hasDetails =
    Boolean(submission.location) ||
    Boolean(submission.service) ||
    Boolean(submission.preferredDate) ||
    Boolean(submission.message);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-3 py-1.5 text-[12px] font-semibold text-navy transition-all hover:border-navy hover:bg-navy hover:text-white shadow-xs"
      >
        <span>👁️</span>
        <span>View Details</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/50 p-4 backdrop-blur-xs">
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-navy/10 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-navy/10 pb-5">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className={badgeClassName}>{typeLabel}</span>
                  {submission.offerLabel && (
                    <span className="text-[13px] font-medium text-rose-deep">
                      {submission.offerLabel}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-serif text-[24px] text-navy">
                  Submission Details
                </h3>
                <p className="text-[12px] text-muted">ID: {submission.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-muted hover:bg-mist hover:text-navy transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Content Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 text-[14px]">
              <div className="space-y-4 rounded-2xl bg-[#FAF9F5] p-5 border border-navy/5">
                <h4 className="font-serif text-[16px] font-semibold text-navy border-b border-navy/10 pb-2">
                  Customer Contact
                </h4>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Full Name
                  </p>
                  <p className="font-medium text-navy mt-0.5">{submission.name}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Email Address
                  </p>
                  <p className="font-medium text-navy mt-0.5">
                    {submission.email ? (
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-rose-deep hover:underline"
                      >
                        {submission.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Phone Number
                  </p>
                  <p className="font-medium text-navy mt-0.5">
                    {submission.phone ? (
                      <a
                        href={`tel:${submission.phone}`}
                        className="text-rose-deep hover:underline"
                      >
                        {submission.phone}
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl bg-[#FAF9F5] p-5 border border-navy/5">
                <h4 className="font-serif text-[16px] font-semibold text-navy border-b border-navy/10 pb-2">
                  Service / Preference
                </h4>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Preferred Clinic
                  </p>
                  <p className="font-medium text-navy mt-0.5">
                    {submission.location || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Service Requested
                  </p>
                  <p className="font-medium text-navy mt-0.5">
                    {submission.service || '—'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                    Preferred Date & Time
                  </p>
                  <p className="font-medium text-navy mt-0.5">
                    {submission.preferredDate || '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* Message Box */}
            {submission.message && (
              <div className="mt-6 rounded-2xl bg-[#FAF9F5] p-5 border border-navy/5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Message / Notes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-navy">
                  {submission.message}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-navy/10 pt-5">
              <span className="text-[12px] text-muted">
                Submitted on {submission.createdAtFormatted}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-navy px-6 py-2 text-[13px] font-semibold text-white hover:bg-rose-deep transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
