import { db } from '@/core/lib';
import type { PasswordResetToken, VerificationToken } from '@prisma/client';

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
    const verificationToken = await db.verificationToken.findUnique({ where: { token } });
    return verificationToken;
  } catch (error) {
    return null;
  }
}

export async function getResetTokenByEmail(email: string): Promise<PasswordResetToken | null> {
  try {
    const resetToken = await db.passwordResetToken.findFirst({ where: { email } });
    return resetToken;
  } catch (error) {
    return null;
  }
}

export async function getResetTokenByToken(token: string): Promise<PasswordResetToken | null> {
  try {
    const resetToken = await db.passwordResetToken.findUnique({ where: { token } });
    return resetToken;
  } catch (error) {
    return null;
  }
}
