import { db } from '@/core/lib';

export async function deleteResetToken(id: string) {
  try {
    await db.passwordResetToken.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}
