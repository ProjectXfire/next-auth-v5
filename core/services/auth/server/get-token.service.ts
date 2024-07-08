import { db } from '@/core/lib';
import type { PasswordResetToken, TwoFactorToken, VerificationToken } from '@prisma/client';

export async function getVerificationTokenByEmail(
  email: string
): Promise<VerificationToken | null> {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { email } });
    return verificationToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}

export async function getVerificationTokenByToken(
  token: string
): Promise<VerificationToken | null> {
  try {
    const verificationToken = await db.verificationToken.findUnique({ where: { token } });
    return verificationToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}

export async function getResetTokenByEmail(email: string): Promise<PasswordResetToken | null> {
  try {
    const resetToken = await db.passwordResetToken.findFirst({ where: { email } });
    return resetToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}

export async function getResetTokenByToken(token: string): Promise<PasswordResetToken | null> {
  try {
    const resetToken = await db.passwordResetToken.findUnique({ where: { token } });
    return resetToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}

export async function getTwoFactorTokenByEmail(email: string): Promise<TwoFactorToken | null> {
  try {
    const resetToken = await db.twoFactorToken.findFirst({ where: { email } });
    return resetToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}

export async function getTwoFactorTokenByToken(token: string): Promise<TwoFactorToken | null> {
  try {
    const resetToken = await db.twoFactorToken.findUnique({ where: { token } });
    return resetToken;
  } catch (error) {
    throw new Error('Internal error server');
  }
}
