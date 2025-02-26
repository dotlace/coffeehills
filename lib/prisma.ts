import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// If prisma is already defined globally, use it, otherwise create a new instance
const prisma = globalThis.prisma || new PrismaClient();

// Store the instance in global for hot-reloading in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
