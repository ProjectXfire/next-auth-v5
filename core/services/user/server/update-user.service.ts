import { db } from '@/core/lib';

export async function updateEmailVerified(id?: string): Promise<boolean> {
  try {
    await db.user.update({ where: { id }, data: { emailVerified: new Date() } });
    return true;
  } catch (error) {
    return false;
  }
}
