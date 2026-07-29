'use client';

import React, { useState, useRef, useEffect } from 'react';

import type { Submission, SubmissionType } from '@/lib/generated/prisma_v2/client';
import {
  downloadCsvInBrowser,
  generateSubmissionsCsv,
  getSubmissionsCsvFilename,
} from '@/lib/data/submissionExport';

type Props = {
  allSubmissions: Submission[];
  currentSubmissions: Submission[];
  activeType?: SubmissionType;
};

const typeLabels: Record<string, string> = {
  BOOKING: 'Bookings',
  CLAIM: 'Claims',
  MEMBERSHIP_REQUEST: 'Membership Requests',
  CONTACT: 'Contact Inquiries',
};

export default function DownloadSubmissionsButton({
  allSubmissions,
  currentSubmissions,
  activeType,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const currentLabel = activeType && typeLabels[activeType] ? typeLabels[activeType] : 'All';

  // Export handlers
  const handleDownloadCurrent = () => {
    const csv = generateSubmissionsCsv(currentSubmissions);
    const filename = getSubmissionsCsvFilename(activeType);
    downloadCsvInBrowser(csv, filename);
    setMenuOpen(false);
  };

  const handleDownloadAll = () => {
    const csv = generateSubmissionsCsv(allSubmissions);
    const filename = getSubmissionsCsvFilename();
    downloadCsvInBrowser(csv, filename);
    setMenuOpen(false);
  };

  const handleDownloadByType = (type: SubmissionType) => {
    const filtered = allSubmissions.filter((s) => s.type === type);
    const csv = generateSubmissionsCsv(filtered);
    const filename = getSubmissionsCsvFilename(type);
    downloadCsvInBrowser(csv, filename);
    setMenuOpen(false);
  };

  // Pre-calculate counts for each submission type
  const counts = {
    BOOKING: allSubmissions.filter((s) => s.type === 'BOOKING').length,
    CLAIM: allSubmissions.filter((s) => s.type === 'CLAIM').length,
    MEMBERSHIP_REQUEST: allSubmissions.filter((s) => s.type === 'MEMBERSHIP_REQUEST').length,
    CONTACT: allSubmissions.filter((s) => s.type === 'CONTACT').length,
  };

  return (
    <div className="relative inline-flex items-center" ref={menuRef}>
      {/* Primary download button for the current active view / filter */}
      <button
        type="button"
        onClick={handleDownloadCurrent}
        className="inline-flex items-center gap-2 rounded-l-xl border border-navy/20 bg-white px-4 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
        title={`Download ${currentLabel} report (${currentSubmissions.length} rows)`}
      >
        <span>⬇ Download {currentLabel} Report</span>
        <span className="rounded-full bg-navy/10 px-2 py-0.5 text-[11px] font-mono">
          {currentSubmissions.length}
        </span>
      </button>

      {/* Dropdown toggle arrow for specific report exports */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex items-center rounded-r-xl border-y border-r border-navy/20 bg-white px-2.5 py-2 text-[13px] text-navy transition-colors hover:bg-navy hover:text-white"
        title="More export options"
      >
        <span>▼</span>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-2xl border border-navy/10 bg-white p-2 shadow-menu">
          <div className="mb-1.5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted">
            Export Report Options
          </div>

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={handleDownloadCurrent}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              <span>Current View ({currentLabel})</span>
              <span className="rounded bg-navy/10 px-1.5 py-0.5 text-[11px] font-mono">
                {currentSubmissions.length}
              </span>
            </button>

            <button
              type="button"
              onClick={handleDownloadAll}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] font-medium text-navy transition-colors hover:bg-navy/5"
            >
              <span>All Submissions</span>
              <span className="rounded bg-navy/10 px-1.5 py-0.5 text-[11px] font-mono">
                {allSubmissions.length}
              </span>
            </button>

            <div className="my-1 border-t border-navy/10" />

            <div className="px-3 py-1 text-[11px] font-semibold text-muted">
              Export Specific Category
            </div>

            <button
              type="button"
              onClick={() => handleDownloadByType('BOOKING')}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[12.5px] text-navy transition-colors hover:bg-navy/5"
            >
              <span>📅 Bookings Only</span>
              <span className="text-[11px] text-muted font-mono">{counts.BOOKING}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadByType('CLAIM')}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[12.5px] text-navy transition-colors hover:bg-navy/5"
            >
              <span>🎁 Claims Only</span>
              <span className="text-[11px] text-muted font-mono">{counts.CLAIM}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadByType('MEMBERSHIP_REQUEST')}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[12.5px] text-navy transition-colors hover:bg-navy/5"
            >
              <span>💎 Membership Requests</span>
              <span className="text-[11px] text-muted font-mono">{counts.MEMBERSHIP_REQUEST}</span>
            </button>

            <button
              type="button"
              onClick={() => handleDownloadByType('CONTACT')}
              className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-[12.5px] text-navy transition-colors hover:bg-navy/5"
            >
              <span>✉️ Contact Inquiries</span>
              <span className="text-[11px] text-muted font-mono">{counts.CONTACT}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
