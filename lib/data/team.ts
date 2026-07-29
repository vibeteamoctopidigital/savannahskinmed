import { prisma } from '@/lib/prisma';
import { buildTeamFallback, type TeamMemberData } from '@/lib/data/shape';
import type { TeamMember } from '@/lib/generated/prisma_v2/client';

/** Public read — returns active team members sorted by sortOrder asc.
 * Falls back to buildTeamFallback() if DB is unreachable or unseeded.
 */
export async function getTeamMembers(): Promise<TeamMemberData[]> {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    if (members.length === 0) {
      return buildTeamFallback();
    }
    return members.map((m: TeamMember) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      highlight: m.highlight,
      bio: m.bio,
      image: m.image,
      imageAlt: m.imageAlt,
      sortOrder: m.sortOrder,
      isActive: m.isActive,
    }));
  } catch {
    return buildTeamFallback();
  }
}

/** Admin read — returns all team members (even inactive) ordered by sortOrder asc. */
export async function getAllTeamMembersForAdmin(): Promise<TeamMemberData[]> {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    if (members.length === 0) {
      return buildTeamFallback();
    }
    return members.map((m: TeamMember) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      highlight: m.highlight,
      bio: m.bio,
      image: m.image,
      imageAlt: m.imageAlt,
      sortOrder: m.sortOrder,
      isActive: m.isActive,
    }));
  } catch {
    return buildTeamFallback();
  }
}

export async function getTeamMemberByIdForAdmin(id: string): Promise<TeamMemberData | null> {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (member) {
      return {
        id: member.id,
        name: member.name,
        role: member.role,
        highlight: member.highlight,
        bio: member.bio,
        image: member.image,
        imageAlt: member.imageAlt,
        sortOrder: member.sortOrder,
        isActive: member.isActive,
      };
    }
  } catch {
    // ignore db error, fallback below
  }

  const fallback = buildTeamFallback().find((m) => m.id === id);
  return fallback || null;
}

