import { db } from '@/core/lib';
import type { VerificationToken } from '@prisma/client';

export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationToken | null> {
  try {
    const token = await db.verificationToken.findFirst({ where: { email } });
    return token;
  } catch (error) {
    return null;
  }
}
