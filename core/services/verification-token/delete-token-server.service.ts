import { db } from '@/core/lib';

export async function deleteVerificationToken(id: string) {
  try {
    await db.verificationToken.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}
