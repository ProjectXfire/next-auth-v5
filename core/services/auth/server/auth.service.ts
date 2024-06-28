import { auth } from '@/auth';
import { UserEntity } from '@/core/entities/user';

export async function getCurrentSession(): Promise<UserEntity | null> {
  try {
    const session = await auth();
    if (!session) return null;
    return UserEntity.fromObject(session.user);
  } catch (error) {
    return null;
  }
}
