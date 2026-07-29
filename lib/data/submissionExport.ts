import type { Submission } from '@/lib/generated/prisma_v2/client';

/**
 * Escapes a cell value for RFC 4180 compliant CSV formatting.
 * If the value contains quotes, commas, or newlines, it wraps in double quotes
 * and doubles any internal double quotes.
 */
export function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) {
    return '""';
  }
  const str = String(val);
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

/**
 * Generates a complete CSV string (with UTF-8 BOM for automatic Excel encoding recognition)
 * from a list of submission records.
 */
export function generateSubmissionsCsv(submissions: Submission[]): string {
  const headers = [
    'Submission ID',
    'Submission Type',
    'Status',
    'Submitted Date',
    'Submitted Time',
    'Full Name',
    'Email',
    'Phone',
    'Offer / Service',
    'Location',
    'Preferred Date',
    'Preferred Time',
    'Message / Inquiry',
    'Admin Notes',
  ];

  const headerRow = headers.map(escapeCsvCell).join(',');

  const rows = submissions.map((s) => {
    const createdAtDate = new Date(s.createdAt);
    const dateStr = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const timeStr = createdAtDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const fullName = s.name ?? [s.firstName, s.lastName].filter(Boolean).join(' ') ?? '';
    const offerOrService = s.offerLabel || s.service || '';

    const cells = [
      s.id,
      s.type,
      s.status,
      dateStr,
      timeStr,
      fullName,
      s.email || '',
      s.phone || '',
      offerOrService,
      s.location || '',
      s.preferredDate || '',
      s.preferredTime || '',
      s.message || '',
      s.notes || '',
    ];

    return cells.map(escapeCsvCell).join(',');
  });

  // Include UTF-8 BOM (\uFEFF) so Excel opens CSVs correctly without garbled symbols
  return '\uFEFF' + [headerRow, ...rows].join('\r\n');
}

/**
 * Generates a clear, human-readable filename for the export based on filter type and current date.
 * e.g., Submissions_Report_All_2026-07-29.csv or Submissions_Report_Bookings_2026-07-29.csv
 */
export function getSubmissionsCsvFilename(filterType?: string): string {
  const today = new Date().toISOString().split('T')[0];
  const typeLabelMap: Record<string, string> = {
    BOOKING: 'Bookings',
    CLAIM: 'Claims',
    MEMBERSHIP_REQUEST: 'Membership_Requests',
    CONTACT: 'Contact_Inquiries',
  };

  const label = filterType && typeLabelMap[filterType] ? typeLabelMap[filterType] : 'All';
  return `Submissions_Report_${label}_${today}.csv`;
}

/**
 * Triggers an immediate browser download of the CSV string.
 */
export function downloadCsvInBrowser(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
