import { UserEntity } from '@/core/entities/user';
import { db } from '@/core/lib';

export async function getUserById(id: string): Promise<UserEntity | null> {
  try {
    const userDb = await db.user.findUnique({ where: { id } });
    if (!userDb) return null;
    const user = UserEntity.fromObject(userDb);
    return user;
  } catch (error) {
    return null;
  }
}
