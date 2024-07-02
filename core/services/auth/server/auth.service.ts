import { auth } from '@/auth';
import type { UserAuth } from '@/core/types/user';

export async function getCurrentSession(): Promise<UserAuth | null> {
  try {
    const session = await auth();
    if (!session) return null;
    if (!session.user) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}
