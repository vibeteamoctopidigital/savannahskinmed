import { prisma } from '@/lib/prisma';
import type {
  Submission,
  SubmissionStatus,
  SubmissionType,
} from '@/lib/generated/prisma/client';

export type CreateSubmissionInput = {
  type: SubmissionType;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  location?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  message?: string;
  offerId?: string;
  offerLabel?: string;
};

/** No fallback here on purpose — there is no sensible static content for "a
 * list of form submissions." Callers get an explicit result shape instead
 * of a thrown error, so the admin UI can render a clear "not connected yet"
 * state rather than crashing. */
export type DbResult<T> = { ok: true; data: T } | { ok: false; error: string };

export async function createSubmission(input: CreateSubmissionInput): Promise<DbResult<Submission>> {
  try {
    const submission = await prisma.submission.create({ data: input });
    return { ok: true, data: submission };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function listSubmissions(filter?: {
  type?: SubmissionType;
}): Promise<DbResult<Submission[]>> {
  try {
    const submissions = await prisma.submission.findMany({
      where: filter?.type ? { type: filter.type } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return { ok: true, data: submissions };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getSubmissionCounts(): Promise<
  DbResult<{ total: number; byType: Record<SubmissionType, number>; newCount: number }>
> {
  try {
    const [total, byTypeRaw, newCount] = await Promise.all([
      prisma.submission.count(),
      prisma.submission.groupBy({ by: ['type'], _count: { _all: true } }),
      prisma.submission.count({ where: { status: 'NEW' } }),
    ]);

    const byType = { BOOKING: 0, CLAIM: 0, MEMBERSHIP_REQUEST: 0, CONTACT: 0 } as Record<
      SubmissionType,
      number
    >;
    for (const row of byTypeRaw) {
      byType[row.type] = row._count._all;
    }

    return { ok: true, data: { total, byType, newCount } };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
): Promise<DbResult<Submission>> {
  try {
    const submission = await prisma.submission.update({ where: { id }, data: { status } });
    return { ok: true, data: submission };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function deleteSubmission(id: string): Promise<DbResult<null>> {
  try {
    await prisma.submission.delete({ where: { id } });
    return { ok: true, data: null };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
