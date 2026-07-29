import { NextRequest, NextResponse } from 'next/server';

import { listSubmissions } from '@/lib/data/submissions';
import { generateSubmissionsCsv, getSubmissionsCsvFilename } from '@/lib/data/submissionExport';
import { SubmissionType } from '@/lib/generated/prisma_v2/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get('type') || '';
  const activeType =
    typeParam && typeParam in SubmissionType ? (typeParam as SubmissionType) : undefined;

  const result = await listSubmissions(activeType ? { type: activeType } : undefined);
  const submissions = result.ok ? result.data : [];

  const csv = generateSubmissionsCsv(submissions);
  const filename = getSubmissionsCsvFilename(activeType);

  return new NextResponse(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
