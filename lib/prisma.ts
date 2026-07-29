import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/lib/generated/prisma_v2/client';

/**
 * `DATABASE_URL` is optional until the real one is supplied (see lib/data/*).
 * A syntactically-valid dummy keeps client construction itself from ever
 * throwing — every real failure mode (missing var, unreachable host, wrong
 * credentials) then surfaces at query time instead, where the data-access
 * layer's try/catch can catch it and fall back to static content.
 */
const DUMMY_DATABASE_URL = 'postgresql://invalid:invalid@localhost:5432/invalid';

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal_v2: PrismaClient | undefined;
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL || DUMMY_DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalThis.prismaGlobal_v2 ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal_v2 = prisma;
}
