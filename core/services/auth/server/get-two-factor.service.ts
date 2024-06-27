import { db } from '@/core/lib';
import { TwoFactorConfirmation } from '@prisma/client';

export async function getTwoFactorConfirmationByUserId(
  userId: string
): Promise<null | TwoFactorConfirmation> {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({ where: { userId } });
    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
}
