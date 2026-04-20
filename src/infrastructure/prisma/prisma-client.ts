import { PrismaClient } from '@prisma/client';

let client: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      log: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['warn', 'error', 'info'],
    });
  }
  return client;
}

export async function disconnectPrisma(): Promise<void> {
  if (client) {
    await client.$disconnect();
    client = null;
  }
}
