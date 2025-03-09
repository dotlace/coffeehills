import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a singleton instance of PrismaClient to avoid creating multiple instances during development
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Assign the prisma client to the global object to reuse it across requests in dev mode
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
