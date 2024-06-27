import { db } from '@/core/lib';

export async function deleteVerificationToken(id: string) {
  try {
    await db.verificationToken.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteResetToken(id: string) {
  try {
    await db.passwordResetToken.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}

export async function deleteTwoFactorToken(id: string) {
  try {
    await db.twoFactorToken.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}
