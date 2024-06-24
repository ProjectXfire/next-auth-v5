import { db } from '@/core/lib';
import type { VerificationToken } from '@prisma/client';

export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationToken | null> {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { email } });
    return verificationToken;
  } catch (error) {
    return null;
  }
}

export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null> {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { token } });
    return verificationToken;
  } catch (error) {
    return null;
  }
}
