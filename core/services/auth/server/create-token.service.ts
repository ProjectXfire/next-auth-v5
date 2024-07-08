import crypto from 'crypto';
import { generateToken } from '@/core/adapters';
import { db } from '@/core/lib';
import {
  getResetTokenByEmail,
  getTwoFactorTokenByEmail,
  getVerificationTokenByEmail,
} from './get-token.service';
import {
  deleteResetToken,
  deleteTwoFactorToken,
  deleteVerificationToken,
} from './delete-token.service';

export async function createVerificationToken(email: string) {
  try {
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const token = generateToken();
    const existToken = await getVerificationTokenByEmail(email);
    if (existToken) {
      await deleteVerificationToken(existToken.id);
    }
    const verificationToken = await db.verificationToken.create({
      data: { email, expires, token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
}

export async function createResetToken(email: string) {
  try {
    const expires = new Date(new Date().getTime() + 600 * 1000);
    const token = generateToken();
    const existToken = await getResetTokenByEmail(email);
    if (existToken) {
      await deleteResetToken(existToken.id);
    }
    const resetToken = await db.passwordResetToken.create({
      data: { email, expires, token },
    });
    return resetToken;
  } catch (error) {
    return null;
  }
}

export async function createTwoFactorToken(email: string) {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 600 * 1000);
    const existToken = await getTwoFactorTokenByEmail(email);
    if (existToken) {
      await deleteTwoFactorToken(existToken.id);
    }
    const twoFactorToken = await db.twoFactorToken.create({
      data: { email, expires, token },
    });
    return twoFactorToken;
  } catch (error) {
    return null;
  }
}
