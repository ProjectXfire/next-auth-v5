import { db } from '@/core/lib';
import type { Account } from '@prisma/client';

export async function getAccountByUserId(userId: string): Promise<null | Account> {
  try {
    const account = await db.account.findFirst({ where: { userId } });
    return account;
  } catch (error) {
    return null;
  }
}
